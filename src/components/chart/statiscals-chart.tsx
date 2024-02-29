import { ChartOptions } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { IoIosArrowForward } from "react-icons/io";
interface IProps {
    statistics: IStatistical[] | undefined;
    warehouses: IWardHouser[] | undefined;
    barOptions: ChartOptions<"bar">;
}
const StatisticalChart = (props: IProps) => {
    const { statistics, warehouses, barOptions } = props;
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
    const statisticsData = {
        labels: statistics?.map((item) => item.date) || [],
        datasets:
            warehouses?.map((warehouse, index) => ({
                label: `${warehouse.warehouseName}`,
                data:
                    statistics
                        ?.filter((daily) =>
                            daily?.warehouseOrderTotals.some(
                                (wo) => wo.warehouseCode === warehouse.warehouseCode
                            )
                        )
                        .map((daily) => {
                            const totalOrder = daily.warehouseOrderTotals.find(
                                (wo) => wo.warehouseCode === warehouse.warehouseCode
                            );
                            return totalOrder ? totalOrder.totalOrder : 0;
                        }) || [],
                backgroundColor: colorCodes[index % colorCodes.length],
                borderColor: "black",
                borderWidth: 1,
            })) || [],
    };

    return (
        <div className="my-1 md:my-0">
            <Bar data={statisticsData} options={barOptions} className="md:px-16 md:py-8"></Bar>
            <div className="my-2 text-end text-gray-600">
                <h3 className=" font-bold md:text-2xl font-mono italic">
                    Biểu đồ thống kê số lượng đơn hàng theo các kho
                </h3>
                <p className="font-mono italic  mt-2">
                    Từ: {statistics?.[0].date.toString()} đến:&ensp;
                    {statistics?.[statistics?.length - 1].date.toString()}
                </p>
            </div>
        </div>
    );
};

export default StatisticalChart;
