import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

const AdminDashboardPanelChartOne = () => {
  const dataBookingShop = useSelector((store) => store.bookingsMadeAtShopData);
  const dataBookingWebsite = useSelector(
    (store) => store.bookingsMadeAtWebsiteData
  );

  return (
    <div className="chart-bar-container">
      <Bar
        data={{
          labels: dataBookingShop.length > 0 && dataBookingShop[0].months,
          datasets: [
            {
              label: "Website",
              data:
                dataBookingWebsite.length > 0 && dataBookingWebsite[0].amount,
              backgroundColor: ["lightcoral"],
            },
            {
              label: "Shop",
              data: dataBookingShop.length > 0 && dataBookingShop[0].amount,
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
              text: "Amount bookings per month",
            },
          },
        }}
      />
    </div>
  );
};

export default AdminDashboardPanelChartOne;
