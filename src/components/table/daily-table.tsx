import React from "react";
interface Iprop {
    dailys: IDaily[] | undefined;
}
const DailyTable = (props: Iprop) => {
    const { dailys } = props;
    return (
        <div className="p-6">
            <div
                className={`relative overflow-x-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-indigo-300`}
            >
                <div className="my-2 text-end">
                    <h3 className=" font-bold md:text-2xl font-mono italic">
                        Bảng thống kê hiệu suất giao đơn hàng {dailys[0].warehouseName}
                    </h3>
                    <p className="font-mono italic  mt-2">
                        Từ: {dailys[0].date} đến:&ensp;
                        {dailys[dailys?.length - 1].date}
                    </p>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase dark:text-gray-400 bg-gray-50">
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="col" className="px-6 py-3">
                                STT
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nội dung
                            </th>
                            {dailys?.map((item, index) => (
                                <th key={index}>{item.date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dailys?.[0]?.reasons.map((reason, reasonIndex) => (
                            <tr key={reasonIndex}>
                                <td className="px-6 py-4">{reasonIndex + 1}</td>
                                <td className="px-6 py-4">{reason.reason}</td>
                                {dailys?.map((daily, dailyIndex) => (
                                    <td className="px-6 py-4" key={dailyIndex}>
                                        {daily.reasons[reasonIndex]?.times}
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

export default DailyTable;
