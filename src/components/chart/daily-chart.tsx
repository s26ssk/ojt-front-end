import { ChartOptions } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
interface IProps {
    dailys: IDaily[] | undefined;
    warehouses: IWardHouser[] | undefined;
    barOptions: ChartOptions<"bar">;
}
const DailyChart = (props: IProps) => {
    const { dailys, barOptions } = props;
    const colorCodes = [
        "rgba(75,192,192,0.6)",
        "rgba(255,99,132,0.6)",
        "rgba(201,203,207,0.6)",
        "rgba(153,102,255,0.6)",
        "rgba(54,162,235,0.6)",
        "rgba(255,159,64,0.6)",
        "rgba(255,205,86,0.6)",
        "rgba(255,0,0,0.6)",
        "rgba(0,255,0,0.6)",
        "rgba(0,0,255,0.6)",
        "rgba(128,0,128,0.6)",
        "rgba(255,255,0,0.6)",
        "rgba(0,255,255,0.6)",
        "rgba(255,0,255,0.6)",
        "rgba(128,128,0,0.6)",
        "rgba(128,0,0,0.6)",
        "rgba(0,128,0,0.6)",
        "rgba(0,0,128,0.6)",
        "rgba(0,128,128,0.6)",
        "rgba(128,0,255,0.6)",
    ];
    const dailyData = {
        labels: dailys?.map((daily) => daily.date.toString()) || [],
        datasets:
            dailys?.[0]?.reasons.map((reason, index) => ({
                label: reason.reason,
                backgroundColor: colorCodes[index % colorCodes.length],
                borderColor: "black",
                borderWidth: 1,
                data:
                    dailys?.map(
                        (daily) => daily.reasons.find((r) => r.reason === reason.reason)?.times
                    ) || [],
            })) || [],
    };

    return (
        <div className="my-1 md:my-0">
            <Bar data={dailyData} options={barOptions} className="md:p-16"></Bar>
            <div className="my-2 text-end text-gray-600">
                <h3 className=" font-bold md:text-2xl font-mono italic">
                    Biểu đồ thống kê hiệu suất giao đơn hàng {dailys?.[0].warehouseName}
                </h3>
                <p className="font-mono italic  mt-2">
                    Từ: {dailys?.[0].date.toString()} đến:&ensp;
                    {dailys?.[dailys?.length - 1].date.toString()}
                </p>
            </div>
        </div>
    );
};

export default DailyChart;
