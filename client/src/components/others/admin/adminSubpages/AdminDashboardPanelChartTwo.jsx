import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

const AdminDashboardPanelChartTwo = () => {
  const paymentsShopData = useSelector((store) => store.paymentsDataShop);
  const paymentsWebsiteData = useSelector((store) => store.paymentsDataWebsite);

  return (
    <div className="chart-bar-container">
      <Bar
        data={{
          labels: paymentsShopData.length > 0 && paymentsShopData[0].months,
          datasets: [
            {
              label: "Website",
              data:
                paymentsWebsiteData.length > 0 && paymentsWebsiteData[0].total,
              backgroundColor: ["lightcoral"],
            },
            {
              label: "Shop",
              data: paymentsShopData.length > 0 && paymentsShopData[0].total,
              backgroundColor: ["lightskyblue"],
            },
          ],
        }}
        width={600}
        height={400}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Amount payments per month",
            },
          },
        }}
      />
    </div>
  );
};

export default AdminDashboardPanelChartTwo;
