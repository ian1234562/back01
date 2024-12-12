export default {
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "vivo",
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000,
          },
          {
            name: "apple",
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: "小米",
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: "三星",
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: "華碩",
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000,
          },
        ],
      },
    };
  },
  getCountData: () => {
    return {
      code: 200,
      data: [
        {
          name: "今日支付訂單",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏訂單",
          value: 210,
          icon: "starFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付訂單",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "本月支付訂單",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏定單",
          value: 210,
          icon: "starFilled",
          color: "#ffb980",
        },
        {
          name: "本月為支付訂單",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
      ],
    };
  },
  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: [
            "2024-10-01",
            "2024-10-02",
            "2024-10-03",
            "2024-10-04",
            "2024-10-05",
            "2024-10-06",
            "2024-10-07",
          ],
          data: [
            {
              蘋果: 3839,
              小米: 1423,
              華為: 4965,
              oppo: 3334,
              華碩: 2820,
              三星: 4751,
            },
            {
              蘋果: 3560,
              小米: 2099,
              華為: 3192,
              oppo: 4210,
              華碩: 1283,
              三星: 1613,
            },
            {
              蘋果: 1864,
              小米: 4598,
              華為: 4202,
              oppo: 4377,
              華碩: 4123,
              三星: 4750,
            },
            {
              蘋果: 2634,
              小米: 1458,
              華為: 4155,
              oppo: 2847,
              華碩: 2551,
              三星: 1733,
            },
            {
              蘋果: 3622,
              小米: 3990,
              華為: 2860,
              oppo: 3870,
              華碩: 1852,
              三星: 1712,
            },
            {
              蘋果: 2004,
              小米: 1864,
              華為: 1395,
              oppo: 1315,
              華碩: 4051,
              三星: 2293,
            },
            {
              蘋果: 3793,
              小米: 3936,
              華為: 3642,
              oppo: 4408,
              華碩: 3374,
              三星: 3874,
            },
          ],
        },
        videoData: [
          { name: "小米", value: 2999 },
          { name: "蘋果", value: 5999 },
          { name: "華碩", value: 1500 },
          { name: "oppo", value: 1999 },
          { name: "華為", value: 2200 },
          { name: "三星", value: 4500 },
        ],
        userData: [
          { date: "周一", new: 5, active: 200 },
          { date: "周二", new: 10, active: 500 },
          { date: "周三", new: 12, active: 550 },
          { date: "周四", new: 60, active: 800 },
          { date: "周五", new: 65, active: 550 },
          { date: "周六", new: 53, active: 770 },
          { date: "周日", new: 33, active: 170 },
        ],
      },
    };
  },
};
