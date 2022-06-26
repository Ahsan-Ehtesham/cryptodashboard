import "./App.css";
import "./styles/css/style.min.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BodySection from "./components/BodySection";

const App = () => {
  const [holders, setHolders] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [events, setEvents] = useState([]);
  const [rates, setRates] = useState([]);
  // zzconst [chartData, setChartData] = useState('');
  // const [pieData, setPieData] = useState('');
  const [quoteData, setQuoteData] = useState('');

  const getTokenHolders = async () => {
    const holderUrl =
      "https://api.covalenthq.com/v1/chains/?key=ckey_3ef3cefb5f2447cabfdc7d26599";
    const response = await fetch(holderUrl);
    const parsedData = await response.json();
    setHolders(parsedData.data.items);
  };

  
  const getToken = async () => {
    const tokenUrl =
      "https://api.covalenthq.com/v1/1/address/0xD417144312DbF50465b1C641d016962017Ef6240/transactions_v2/?key=ckey_3ef3cefb5f2447cabfdc7d26599&page-size=10";
    const response = await fetch(tokenUrl);
    const parsedData = await response.json();
    // console.log(parsedData.items);
    setTokens(parsedData.data.items);
    // console.log(parsedData.data.items);
  };

  const getEvent = async () => {
    const tokenUrl =
      "https://api.covalenthq.com/v1/1/events/address/0xD417144312DbF50465b1C641d016962017Ef6240/?starting-block=14993520&ending-block=14993619&key=ckey_3ef3cefb5f2447cabfdc7d26599";
    const response = await fetch(tokenUrl);
    const parsedData = await response.json();
    // console.log(parsedData.items);
    setEvents(parsedData.data.items);
    // console.log(parsedData.data.items);
  };

  const getRateRequest = async () => {
    const rateUrl =
      "https://api.covalenthq.com/v1/1/address/0xD417144312DbF50465b1C641d016962017Ef6240/balances_v2/?key=ckey_3ef3cefb5f2447cabfdc7d26599";
    const response = await fetch(rateUrl);
    const parsedData = await response.json();
    // console.log(parsedData.data.items);
    setRates(parsedData.data.items);
  };

  // const fetchPrices = async () => {
  //   const response = await fetch(
  //     "https://api.covalenthq.com/v1/1/address/0x0f51bb10119727a7e5ea3538074fb341f56b09ad/portfolio_v2/?key=ckey_3ef3cefb5f2447cabfdc7d26599"
  //   );
  //   const parsedData = await response.json();
  //   // console.log(parsedData.items);
  //   setChartData({
  //     labels:parsedData.items[0].holdings.map((crypto) =>
  //       new Date(crypto.timestamp).toLocaleDateString()
  //     ),
  //     datasets: [
  //       {
  //         label: "Price in USD",
  //         data:parsedData.items[0].holdings.map((crypto) => crypto.quote_rate),
  //         borderColor: "#00506c",

  //         color: "#fff",
  //         pointBackgroundColor: "rgb(242, 185, 44)",
  //         pointRadius: 5,
  //         pointStyle: "circle",
  //         fill: false,
  //         scaleFontColor: "#fff",

  //         scales: {
  //           xAxes: [
  //             {
  //               gridLines: {
  //                 display: true,
  //               },
  //             },
  //           ],
  //           yAxes: [
  //             {
  //               gridLines: {
  //                 display: false,
  //                 color: "#fff",
  //                 scaleFontColor: "#fff",
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   });
  // };

  const fetchQuote = async () => {
    const response = await fetch(
      "https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/1/USD/0xD417144312DbF50465b1C641d016962017Ef6240/?quote-currency=USD&format=JSON&from=2022-06-01&to=2022-06-25&prices-at-asc=true&key=ckey_3ef3cefb5f2447cabfdc7d26599"
    );
    const parsedData = await response.json();
    // console.log(parsedData.data[0].prices[0].price);
    setQuoteData({
      labels:parsedData.data[0].prices.map((crypto) => crypto.price),
      datasets: [
        {
          label: "Price in USD",
          data:parsedData.data[0].prices.map((crypto) => crypto.date),

          borderColor: ["yellow"],
          borderWidth: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  fontColor: "green",
                  fontSize: 18,
                  // beginAtZero: true,
                },
              },
            ],
          },
          backgroundColor: "rgba(184, 185, 210, .3)",
        },
      ],
    });
  };

  // const fetchDate = async () => {
  //   const response = await fetch(
  //     "https://api.covalenthq.com/v1/1/address/0xD417144312DbF50465b1C641d016962017Ef6240/portfolio_v2/?&key=ckey_3ef3cefb5f2447cabfdc7d26599"
  //   );
  //   const parsedData = await response.json();
  //   setPieData({
  //     labels:parsedData?.data?.items?.map((crypto) => crypto.contract_decimals),
  //     datasets: [
  //       {
  //         label: "My First dataset",
  //         fill: true,
  //         lineTension: 0.3,
  //         backgroundColor: "rgba(225, 204,230, .3)",
  //         data:parsedData?.data?.items?.holdings.map((crypto) => crypto.gas_quote),
  //       },
  //       {
  //         label: "My Second dataset",
  //         fill: true,
  //         lineTension: 0.3,
  //         backgroundColor: "rgba(184, 185, 210, .3)",
  //         borderColor: "yellow",
  //         data:parsedData?.data?.items?.holdings.map((crypto) => crypto.timestamp),
  //       },
  //     ],
  //   });
  //   console.log(parsedData.data.items);
  // };

  useEffect(() => {
    getTokenHolders();
    getToken();
    getEvent();
    getRateRequest();
    // fetchPrices();
    fetchQuote();
    // fetchDate();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <BodySection
        holders={holders}
        tokens={tokens}
        events={events}
        rates={rates}
        // chartData={chartData}
        // pieData={pieData}
        quoteData={quoteData}
      />
    </>
  );
};

export default App;
