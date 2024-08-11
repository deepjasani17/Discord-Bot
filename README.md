# Discord StockBot

A Discord bot that provides stock information and charts using the Alpha Vantage API. The bot can reply with stock details, including top gainers and losers, and generate charts for stock performance over different periods.

## Features

- Responds to stock queries with real-time data from Alpha Vantage.
- Provides information on top gainers and losers.
- Generates performance charts for stocks over different periods (7 days, 1 month, 6 months, and 1 year).

## Dependencies

- `chart.js`: "^4.4.0"
- `discord.js`: "^14.13.0"
- `dotenv`: "^16.4.5"
- `node-fetch`: "^2.7.0"
- `nodemon`: "^3.0.1"
- `quickchart-js`: "^3.1.3"
- `request`: "^2.88.2"

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/discord-stockbot.git
2. Navigate to the project directory:
   ```bash
   cd discord-stockbot
3. Install the dependencies:
   ```bash
   npm install
4. Create a `.env` file in the root directory with the following content:
   ```env
   API_KEY=your_alpha_vantage_api_key
   CLIENT_ID=your_discord_bot_client_id
5. Run the bot:
   ```bash
   npm start

## Usage

1. Join my discord server to use the stockbot.
2. Use the bot by mentioning it in your messages with the stock query. For example:
    - `@StockBot AAPL`
    - `@StockBot top gainers`
    - `@StockBot top losers`
   
3. The bot will reply with the relevant stock information and charts.
  
## Acknowledgments

1. Alpha Vantage for providing stock data.
2. Discord.js for the bot framework.
3. QuickChart for generating charts.

## Demo video of StockBot

https://github.com/deepjasani17/Discord-bot/assets/130975061/213c3aac-be27-4825-8ee5-f9000ba31256
