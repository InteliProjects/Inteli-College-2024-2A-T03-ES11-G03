const { Markup } = require('telegraf');
const client = require("../config/db");
const bcrypt = require('bcrypt');
const axios = require('axios');

async function getVendedorByCod(cod_vendedor) {
  const query = `SELECT * FROM vendedores WHERE cod_vendedor = '${cod_vendedor}' LIMIT 1;`;
  const response = await client.query({ query, format: 'JSON' });
  const rows = await response.json();
  return rows.data[0];
}

async function updatePassword(cod_vendedor, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = `ALTER TABLE vendedores UPDATE password = '${hashedPassword}' WHERE cod_vendedor = '${cod_vendedor}'`;
  await client.command({ query });
}

async function checkPassword(inputPassword, storedPassword) {
  return await bcrypt.compare(inputPassword, storedPassword);
}

async function getVendedorPerformance(cod_vendedor) {
  const query = `
    SELECT 
      id_employee,
      month,
      CAST(sales_target AS Int32) AS sales_target,
      CAST(total_vendido AS Int32) AS total_vendido 
    FROM vw_cumprimento_metas_mensal_vendedoress
    WHERE id_employee = '${cod_vendedor}'
    AND SUBSTRING(month, 4, 4) = '2024'
    ORDER BY month DESC;
  `;
  try {
    const response = await client.query({ query, format: 'JSON' });
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Error querying vendedor performance:", err);
    throw err;
  }
}

async function fetchRecommendedProducts(subcategoria) {
  try {
    const response = await axios.post('http://127.0.0.1:5000/cross_selling', {
      sub_categoria: subcategoria
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching recommended products:", err.response?.data || err.message);
    throw err;
  }
}

function initializeCommands(botInteraction) {
  botInteraction.start((ctx) => {
    ctx.reply('Bem-vindo(a)! Por favor, faça login ou crie uma senha:', Markup.inlineKeyboard([
      [Markup.button.callback('Fazer login ou criar senha', 'login_signup')]
    ]));
  });
}

function initializeActions(botInteraction) {
  let currentCodVendedor = null;
  let awaitingPassword = false;
  let isSignupFlow = false;
  let isLoggedIn = false;

  botInteraction.action('login_signup', async (ctx) => {
    ctx.reply('Por favor, informe o seu cod_vendedor:');
    awaitingPassword = false;
  });

  botInteraction.on('message', async (ctx) => {
    const text = ctx.message.text;

    if (!awaitingPassword) {
      const cod_vendedor = parseInt(text, 10);
      if (isNaN(cod_vendedor)) {
        return ctx.reply('cod_vendedor inválido. Por favor, insira um número válido.');
      }

      const vendedor = await getVendedorByCod(cod_vendedor);
      if (!vendedor) {
        return ctx.reply('cod_vendedor não encontrado. Tente novamente.');
      }

      currentCodVendedor = vendedor.cod_vendedor;

      if (vendedor.password) {
        ctx.reply('Por favor, insira sua senha:');
        isSignupFlow = false;
      } else {
        ctx.reply('Nenhuma senha encontrada. Por favor, crie uma nova senha:');
        isSignupFlow = true;
      }

      awaitingPassword = true;
    } else {
      const password = text;

      const vendedor = await getVendedorByCod(currentCodVendedor);

      if (isSignupFlow) {
        await updatePassword(currentCodVendedor, password);
        ctx.reply('Senha criada com sucesso! Você está agora logado(a).');
        isLoggedIn = true;
        showMainMenu(ctx);
      } else {
        const passwordMatch = await checkPassword(password, vendedor.password);
        if (passwordMatch) {
          ctx.reply('Login bem-sucedido! Bem-vindo(a) de volta.');
          isLoggedIn = true;
          showMainMenu(ctx);
        } else {
          ctx.reply('Senha incorreta. Tente novamente.');
        }
      }

      awaitingPassword = false;
    }
  });

  function showMainMenu(ctx) {
    ctx.reply('Escolha uma categoria:', Markup.inlineKeyboard([
      [Markup.button.callback('Performance', 'management')],
      [Markup.button.callback('Auxílio em vendas', 'sales_assistance')]
    ]));
  }

  botInteraction.action('management', (ctx) => {
    ctx.reply('Acompanhamento de Performance:', Markup.inlineKeyboard([
      [Markup.button.callback('Histórico de vendas - Mensal', 'option1')],
      [Markup.button.callback('Bônus - Mensal', 'bonus_mensal')],
      [Markup.button.callback('Voltar', 'main_menu')]
    ]));
  });

  // New action to handle "Bônus - Mensal"
  botInteraction.action('bonus_mensal', async (ctx) => {
    if (!currentCodVendedor || !isLoggedIn) {
      return ctx.reply('Você precisa fazer login primeiro.');
    }

    try {
      // Query the vw_total_margem_vendedor view to get the total margin for each month
      const query = `
        SELECT 
          mes_ano, 
          total_margin 
        FROM vw_total_margem_vendedor 
        WHERE cod_vendedor = ${currentCodVendedor}
        ORDER BY mes_ano DESC;
      `;
      const response = await client.query({ query, format: 'JSON' });
      const result = await response.json();

      if (result.data.length > 0) {
        let bonusMessage = 'Aqui estão os seus bônus mensais para o ano de 2024:\n\n';

        result.data.forEach(({ mes_ano, total_margin }) => {
          const bonus = total_margin * 0.05; // Calculate 5% of the total_margin
          bonusMessage += `Mês: ${mes_ano}\nBônus: R$ ${bonus.toFixed(2)}\n\n`;
        });

        ctx.reply(bonusMessage);
      } else {
        ctx.reply('Nenhum dado de bônus encontrado para o ano de 2024.');
      }
    } catch (err) {
      console.error("Error fetching bonus data:", err);
      ctx.reply('Ocorreu um erro ao tentar buscar os dados de bônus.');
    }
  });

  botInteraction.action('sales_assistance', (ctx) => {
    ctx.reply('Escolha uma opção de Auxílio em vendas:', Markup.inlineKeyboard([
      [Markup.button.callback('Qual produto posso oferecer para o cliente nessa época do ano?', 'option2')],
      [Markup.button.callback('Recomendação', 'recommendation')],
      [Markup.button.callback('Voltar', 'main_menu')]
    ]));
  });

  botInteraction.action('recommendation', (ctx) => {
    ctx.reply('Escolha uma subcategoria de recomendação:', Markup.inlineKeyboard([
      [Markup.button.callback('Hidratante', 'subcategory_1')],
      [Markup.button.callback('Balm', 'subcategory_2')],
      [Markup.button.callback('Perfume', 'subcategory_3')],
      [Markup.button.callback('Blush', 'subcategory_4')],
      [Markup.button.callback('Batom', 'subcategory_5')],
      [Markup.button.callback('Corretivo', 'subcategory_6')],
      [Markup.button.callback('Máscara', 'subcategory_7')],
      [Markup.button.callback('Sombra', 'subcategory_8')],
      [Markup.button.callback('Voltar', 'sales_assistance')]
    ]));
  });

  const categoryMap = {
    subcategory_1: 'Hidratante',
    subcategory_2: 'Balm',
    subcategory_3: 'Perfume',
    subcategory_4: 'Blush',
    subcategory_5: 'Batom',
    subcategory_6: 'Corretivo',
    subcategory_7: 'Máscara',
    subcategory_8: 'Sombra'
  };

  for (let i = 1; i <= 8; i++) {
    botInteraction.action(`subcategory_${i}`, async (ctx) => {
      if (!isLoggedIn) {
        return ctx.reply('Você precisa fazer login primeiro.');
      }

      const category = categoryMap[`subcategory_${i}`];

      try {
        const { recommended_products, suggested_subcategory } = await fetchRecommendedProducts(category);

        let productMessage = `Produtos recomendados:\n\n`;

        recommended_products.forEach(product => {
          productMessage += `- ${product}\n`;
        });

        if (suggested_subcategory && suggested_subcategory.length > 0) {
          productMessage += `\nOs produtos são da(s) categoria(s):\n`;
          suggested_subcategory.forEach(sub => {
            productMessage += `- ${sub}\n`;
          });
        }

        ctx.reply(productMessage);
      } catch (err) {
        ctx.reply('Ocorreu um erro ao buscar as recomendações de produtos.');
      }
    });
  }

  botInteraction.action('option1', async (ctx) => {
    if (!currentCodVendedor || !isLoggedIn) {
      return ctx.reply('Você precisa fazer login primeiro.');
    }

    try {
      const performanceData = await getVendedorPerformance(currentCodVendedor);

      if (performanceData.length > 0) {
        let performanceMessage = 'Aqui estão os dados do seu desempenho para o ano de 2024:\n\n';

        performanceData.forEach(({ month, sales_target, total_vendido }) => {
          performanceMessage += `
            Mês: ${month}
            Meta: R$ ${sales_target}
            Total Vendido: R$ ${total_vendido}\n
          `;
        });

        ctx.reply(performanceMessage);
      } else {
        ctx.reply('Nenhum dado de desempenho encontrado para o ano de 2024.');
      }
    } catch (err) {
      console.error("Error fetching performance data:", err);
      ctx.reply('Ocorreu um erro ao tentar buscar seus dados de desempenho.');
    }
  });

  botInteraction.action('main_menu', (ctx) => {
    showMainMenu(ctx);
  });
}

module.exports = {
  initializeCommands,
  initializeActions
};
