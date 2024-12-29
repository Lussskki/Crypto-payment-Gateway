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
    # Make sure the script receives valid inputs
    if len(sys.argv) < 3:
        print("Error: Insufficient arguments")
        sys.exit(1)

    operation = sys.argv[1]  # 'fees' or 'convert'
    try:
        amount = float(sys.argv[2])  # Ensure the amount is cast to float
    except ValueError:
        print("Error: Invalid amount")
        sys.exit(1)

    if operation == 'fees':
        result = calculate_transaction_fee(amount)
        print(f"{result:.2f}")  # Print as a float with 2 decimal places
    elif operation == 'convert':
        result = convert_to_btc(amount)
        print(f"{result:.8f}")  # Print as a float with 8 decimal places for BTC
    else:
        print("Error: Invalid operation. Use 'fees' or 'convert'.")
        sys.exit(1)
