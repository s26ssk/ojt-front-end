import React from "react";
interface Iprop {
    statistics: IStatistical[] | undefined;
}
const StatiscalTable = (props: Iprop) => {
    const { statistics } = props;
    return (
        <div className="p-6">
            <div
                className={`relative overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-indigo-300`}
            >
                <div className="my-2">
                    <h3 className="text-end font-bold md:text-2xl font-mono italic">
                        Bảng thống kê số lượng đơn hàng theo các kho
                    </h3>
                    <p className="font-mono italic text-end mt-2">
                        Từ: {statistics[0].date.toString()} đến:&ensp;
                        {statistics[statistics?.length - 1].date.toString()}
                    </p>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 bg-gray-50">
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="col" className="px-6 py-3">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mã kho
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên kho
                            </th>
                            {statistics?.map((item, index) => (
                                <th key={index}>{item.date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {statistics &&
                            statistics[0]?.warehouseOrderTotals.map((order, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{order.warehouseCode}</td>
                                    <td className="px-6 py-4">{order.warehouseName}</td>
                                    {statistics?.map((item, subIndex) => (
                                        <td className="px-6 py-4" key={subIndex}>
                                            {item.warehouseOrderTotals[index]
                                                ? item.warehouseOrderTotals[index].totalOrder
                                                : 0}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatiscalTable;
