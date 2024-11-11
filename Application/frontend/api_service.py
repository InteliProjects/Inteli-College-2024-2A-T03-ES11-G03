import requests
import pandas as pd
import streamlit as st


API_BASE_URL = "http://localhost:3000/api"

def login_api(cpf):
    url = f"{API_BASE_URL}/login"
    payload = {
        "cpf": cpf
    }
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        data = response.json()
        return data["token"]
    else:
        return 'null'
    
def get_headers():
    token = st.session_state.get('token', None)
    headers = {
        "Authorization": f"Bearer {token}"
    }
    return headers

def get_top_sellers(month):
    url = f"{API_BASE_URL}/dashboard/top-sellers"
    payload = {
        "month": month
    }
    headers = get_headers()
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return []

def get_daily_sales(month):
    url = f"{API_BASE_URL}/dashboard/daily-sales"
    payload = {
        "month": month
    }
    headers = get_headers()
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        data_df = pd.DataFrame(data)
        data_df['transaction_data'] = pd.to_datetime(data_df['transaction_data'])
        data_df['month'] = data_df['transaction_data'].dt.strftime('%Y/%m')
        return data_df
    else:
        return []
    
def get_total_sales(month):
    url = f"{API_BASE_URL}/dashboard/total-sales"
    payload = {
        "month": month
    }
    headers = get_headers()
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return []

def get_top_products(month):

    url = f"{API_BASE_URL}/dashboard/top-products"
    payload = {
        "month": month
    }
    headers = get_headers()
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return []
    
def get_top_stores(month):
    payload = {
        'month': month
    }
    url = f"{API_BASE_URL}/dashboard/store-performance"
    headers = get_headers()
    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return []
    
def get_manager_compensation(month):
    payload = {
        "month": month,
    }
    url = f"{API_BASE_URL}/dashboard/manager-salary"
    headers = get_headers()
    response = requests.get(url, json=payload, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return []


    