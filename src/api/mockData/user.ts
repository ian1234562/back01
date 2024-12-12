import Mock from "mockjs";

interface UserData {
  id: any;
  name: string;
  age: number;
  addr: string;
  birth: any;
  sex: any;

  // ... 其他用戶屬性
}

let List: UserData[] = [];

interface Config {
  body: string;
  // ... 其他配置屬性
}
//get請球從config.url獲取參數,post從config.body獲取數據

const count = 50;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.Random.county(true),
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: "" + Mock.Random.integer(0, 1),
      //integer(最大值和最小值) 為一個函數方法名字
    })
  );
}
export default {
  /*
   *@param name,page,limit
   *@return{{code:number,count:number,data:*[]}}
   */
  // axios instance ->function(axios 已經有定義options代表什麼),這裡的options跟定義的不一樣 -> request -> mock -> getUserData()
  // 如果照axios的定義去傳進去options
  // return {
  //   code: 200,
  //   data: {
  //     list: pageList,
  //     count: mockList.length,
  //   },
  // };
  // 因為傳錯 一些options的設置
  // 剛剛回傳都會回傳 <DOCTYPE> html xxxxxxx<xxx>的東西
  // 因為回傳的是這個
  // 所以你的res.data根本取不到值
  getUserList: (config: Config) => {
    console.log("config:", config);
    // config.body => "{"name":""}"
    const requestBody = config.body;
    const bodyObject = JSON.parse(requestBody);
    console.log("bodyObject:", bodyObject);

    const page = bodyObject.page;
    const limit = 10;
    const name = bodyObject.name;
    // console.log(page);
    //假設名字不是空並且 indexof的返回值不是-1則執行
    const mockList = List.filter((user) => {
      if (name && user.name.indexOf(name) === -1) return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length,
      },
    };
  },
  /// 刪除用戶 ＠param id
  deleteUser: (config: Config) => {
    const requestBody = config.body;
    const bodyObject = JSON.parse(requestBody);
    const id = bodyObject.id;
    console.log("id:", id);
    if (!id) {
      return {
        code: -999,
        message: "參數錯誤",
      };
    } else {
      //過濾出id不等於當前id的 新的數組
      List = List.filter((u) => u.id !== id);
      return {
        code: 200,
        message: "刪除成功",
      };
    }
  },
  //增加用戶
  createUser: (config: Config) => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body);
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex,
    });
    return {
      code: 200,
      data: {
        message: "添加成功",
      },
    };
  },
  updateUser: (config: Config) => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
    // 2. 將性別轉換為數字類型
    const sex_num = parseInt(sex);
    /// Array.some 是用來檢查陣列裡面是否有一些符合條件。只要有一個以上符合條件就會回傳 true，全部都不是的話會回傳 false。
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.addr = addr;
        u.age = age;
        u.birth = birth;
        u.sex = sex_num;
        return true; // 找到後停止遍歷
      }
    });
    return {
      code: 200,
      data: {
        message: "編輯成功",
      },
    };
  },
};
