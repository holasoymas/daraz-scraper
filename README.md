## DarazScraper, a web scraping site where it tracks the products price and notify us when it is the best time to buy.

### Install dependencies 

```bash
npm install 
# or 
pnpm install
#or 
yarn install
#or 
bun install
```
### Setup Environments variables 
Create `.env` file in your root directory, then 
```.env
BRIGHT_DATA_USERNAME=username_of_brightdata
BRIGHT_DATA_PASSWORD=password_of_brightdata

# MONGODB
MONGODB_URI=YOUR_MONGO_URI

#FOR MAIL SENDING
MAIL_USER=youremail@mail.com
MAIL_PASS="your pass"
```
**_NOTE:_** __*Don't forget to put environments variables of yours.*__


Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


