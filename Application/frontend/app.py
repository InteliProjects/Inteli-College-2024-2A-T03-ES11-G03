import streamlit as st
from api_service import login_api, get_top_sellers, get_total_sales, get_top_products, get_top_stores, get_manager_compensation
import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

st.set_page_config(layout="wide", page_title="InsightCo")

st.markdown(
    """
    <style>
    .stAppViewBlockContainer {
        padding: 40px 28px;
        margin-top: 10px;
    }
    </style>
    """,
    unsafe_allow_html=True
)

def show_login_page():
    st.title("Login")
    cpf = st.text_input("Digite seu CPF")

    if st.button("Login"):
        token = login_api(cpf)
        if token and token != 'null':
            st.session_state['token'] = token
            st.success("Login realizado com sucesso!")
            st.experimental_rerun()
        else:
            st.error("CPF inválido ou erro no login.")

def show_dashboard_page():
    st.title("Dashboard")
    if 'token' not in st.session_state:
        st.warning("Por favor, faça login primeiro.")
        st.experimental_rerun() 

    left_top, middle_top, right_top = st.columns([0.3,0.6,0.1])

    with left_top:
        month = st.selectbox("Selecione o mês", ["202301", "202309"])

    with right_top:
        if st.button("Logout"):
            st.session_state.pop('token', None)
            st.experimental_rerun()


    if st.button("Carregar Dados"):
        col1, col2, col3, col4 = st.columns([1, 1, 1, 1], gap="small")

        with col1:
            total_sales = get_total_sales(month)
            st.metric(label="Total de vendas", value=f"R$ {total_sales[0]["receita"]:.2f}")

        with col2:
            st.metric(label="Ticket médio", value=f"R$ {total_sales[0]["ticket_medio"]:.2f}")

        with col3:
            compensation = get_manager_compensation(month)
            st.metric(label=" Bônus do mês", value=f"R$ {compensation[0][0]}")

        with col4:
            fig = go.Figure(go.Pie(
                    values=[84, 16], 
                hole=.7,          
                marker=dict(colors=['lightblue', 'red']),
                textinfo='none'  
            ))

            fig.update_layout(
                showlegend=False,
                margin=dict(t=0, b=0, l=0, r=0),
                annotations=[
                    dict(text=f'84%', x=0.5, y=0.55, font_size=30, showarrow=False, font_color="white"),
                    dict(text='da meta alcançada', x=0.5, y=0.45, font_size=11, showarrow=False),
                ],
                height=200,
                width=200
            )

            st.plotly_chart(fig, use_container_width=True)

        col5, col6, col7 = st.columns([3, 1, 2])

        with col5:
            data = [
                4900.22, 5300.43, 6700.55, 10400.12, 12200.44, 10950.33, 7200.88, 4600.22,
                5850.99, 9100.77, 12400.89, 13650.12, 8600.77, 7800.33, 4900.55, 10400.11,
                9400.55, 6600.32, 13500.88, 5700.11, 12050.32, 6100.77, 4900.88, 14400.33,
                5000.11, 6700.33, 15400.66, 5800.55, 9600.23, 8300.45
            ]
            st.subheader("Vendas Diárias ao longo do mês")
            dias = np.arange(1, 31)
            valores = data
            df = pd.DataFrame({
            'Dia': dias,
            'Valor': valores
        })
            fig = px.line(df, x='Dia', y='Valor', labels={
            'Dia': 'Dia',
            'Valor': 'Total de Vendas (R$)'
            })
            st.plotly_chart(fig, use_container_width=True)

        with col7:
            st.subheader("Melhores Vendedores")
            top_sellers = get_top_sellers(month)
            for seller in top_sellers:
                with st.expander(f"{seller['nome']}"):
                    st.write(f"Meta do Vendedor: R$ {seller["meta_vendedor"]}")
                    st.write(f"Receita Total: R$ {seller["total_revenue"]:.2f}")

        col8, col9 = st.columns(2)
        with col8:
            top_produtos = get_top_products(month)
            top_produtos_df = pd.DataFrame(top_produtos)
            st.subheader("Produtos mais vendidos")
            st.table(top_produtos_df)

        with col9:
            top_stores = get_top_stores(month)
            top_stores_df = pd.DataFrame(top_stores)
            st.subheader("Melhores Lojas")
            st.table(top_stores_df)

if 'token' not in st.session_state:
    show_login_page()
else:
    show_dashboard_page()
