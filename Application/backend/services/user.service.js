const client = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class UserService {
  async findByCPF(cpf) {
    const query = `SELECT * FROM default.employee_final WHERE cpf = {cpf: String}`;

    const resultStream = await client.query({
      query,
      query_params: { cpf },
      format: "JSONEachRow",
    });

    let resultData = "";

    return new Promise((resolve, reject) => {
      resultStream._stream.on("data", (chunk) => {
        resultData += chunk.toString();
      });

      resultStream._stream.on("end", () => {
        const users = resultData
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => JSON.parse(line));

        const user = users.find((u) => u.cpf === cpf);
        resolve(user);
      });

      resultStream._stream.on("error", (error) => {
        reject(error);
      });
    });
  }

  async registerUser(userDetails) {
    const { id_employee, name, surname, cpf, role_employee, store_id } = userDetails;
  
    const id = Math.floor(Math.random() * 1000000);
    const trimmedIdEmployee = id_employee ? id_employee.toString() : "0";
    const trimmedName = name ? name.trim() : "";
    const trimmedSurname = surname ? surname.trim() : "";
    const trimmedCpf = cpf ? cpf.trim() : "";
    const trimmedRoleEmployee = role_employee ? role_employee.trim() : "";
    const trimmedStoreId = store_id ? store_id.trim() : "";
  
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB').replace(/\//g, '/');
  
    const rows = [
      {
        id_employee: trimmedIdEmployee,
        name: trimmedName,
        surname: trimmedSurname,
        cpf: trimmedCpf,
        status: 'ativo',
        role: trimmedRoleEmployee,
        initial_date: formattedDate,
        end_date: '',
        store_id: trimmedStoreId,
        id: id,
      },
    ];
    const toInsertValue = (r) => `(${r.id_employee}, '${r.name}', '${r.surname}', '${r.cpf}', '${r.status}', '${r.role}', '${r.initial_date}', '${r.end_date}', '${r.store_id}', '${r.id}')`;
  
    const insertQuery = `
      INSERT INTO default.employee_final
        (id_employee, name, surname, cpf, status, role, initial_date, end_date, store_id, id)
      VALUES
        ${rows.map((r) => toInsertValue(r)).join(',')};
    `;
  
    const commandSettings = {};  // Add any ClickHouse-specific settings here
  
    try {
      await client.command({
        query: insertQuery,
        clickhouse_settings: commandSettings,
      });
    } catch (error) {
      console.error("Erro ao executar a query:", error.message);
    }
  }
  
  
}

module.exports = UserService;
