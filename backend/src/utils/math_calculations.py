import sys

def calculate_transaction_fee(amount):
    fee = amount * 0.05  # Example: 5% fee
    total = amount + fee
    return total

def convert_to_btc(amount):
    conversion_rate = 0.000033  # Example rate: 1 USD = 0.000033 BTC
    btc_value = amount * conversion_rate
    return btc_value

if __name__ == "__main__":
    operation = sys.argv[1]  # 'fees' or 'convert'
    amount = float(sys.argv[2])  # Ensure the amount is cast to float

    if operation == 'fees':
        print(f"{calculate_transaction_fee(amount)}")  # Print as a number
    elif operation == 'convert':
        print(f"{convert_to_btc(amount)}")  # Print as a number
