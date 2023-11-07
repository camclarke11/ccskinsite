from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Function to scrape prices from the page for given marketplaces
def get_market_prices(url, markets):
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    market_prices = {}

    if response.ok:
        soup = BeautifulSoup(response.content, 'html.parser')
        price_divs = soup.find_all("div", {"class": "w-full whitespace-nowrap"})
        price_spans = soup.find_all("span", {"class": 'font-bold text-xl'})
        
        for market in markets:
            for div, span in zip(price_divs, price_spans):
                if market.lower() in str(div).lower():
                    market_prices[market] = BeautifulSoup(str(span), "html.parser").text.strip()
                    break
            else:
                market_prices[market] = 'Price not found'

        return market_prices
    else:
        return {"Error": "Failed to retrieve the page"}

@app.route('/get_prices', methods=['POST'])
def prices():
    data = request.json
    chosen_weapon = data['weapon'].replace(" ", "-").lower()
    chosen_skin = data['skin'].replace(" ", "-").replace("'", "").lower()
    chosen_quality = data['quality'].replace(" ", "-").lower()
    url = f"https://csgoskins.gg/items/{chosen_weapon}-{chosen_skin}/{chosen_quality}"
    
    # Define the marketplaces we are interested in
    markets = ['buff163', 'gamerpay', 'csfloat', 'skinport', 'dmarket', 'steam']

    # Get and display the market prices
    market_prices = get_market_prices(url, markets)
    return jsonify({"url": url, "prices": market_prices})

if __name__ == '__main__':
    app.run(debug=True)
