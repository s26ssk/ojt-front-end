interface IProvince {
    code: number;
    codename:string;
    division_type:string
    name: string;
    phone_code:number;
    districts: IHuyen[];
}

interface IDistrict {
    code:number;
    codename:string;
    division_type:string;
    province_code:number;
    name: string;
    wards: IWard[];
}

interface IWard {
    code:number;
    codename:string;
    division_type:string;
    province_code:number;
    name: string;
}
interface CheckedItems {
    [key: string]: boolean;
}
interface IOrderHistory{
    hid: number;
    orderCode: string;
    status: string;
    updateAt: Date;
    comment: string;
}

interface IWardHouser{
    address:string;
    warehouseName:string;
    warehouseCode:string;
}
interface IWarehouse {
    warehouseCode:string
    warehouseName: string
    address:string
    latitude:string
    longitude:string
    capacity:string
    available:string
  } 
interface IOrder{
    orderCode: string;
    createDate: Date;
    providerName: string;
    providerPhone: string;
    providerAddress: string;
    providerEmail: string;
    receiverName: string;
    receiverPhone: string;
    receiverAddress: string;
    receiverEmail: string;
    warehouse: IWardHouser;
    orderStatus: string;
    ordersHistories: IOrderHistory[];
}

interface IRegister {
    shopName: string;
    password: string;
    address: string;
    phone: string;
    email: string;
    confirmPassword: string;
    [key: string]: string;
}

interface ILogin {
    emailOrPhone: string;
    password: string;
}

interface IUserLogin {
    shopName: string;
    phone: string;
    address: string;
    email: string;
    avatar: string;
    token: string
}

interface IChangePass {
    curPass: string;
    newPass: string;
    cfPass: string;
  }
interface IDelivery{
    orderCode: string;
    status: string;
    comment: string;
}

interface IStatistical {
    date: Date;
    warehouseOrderTotals: IWarehouseOrderTotal[];
  }
  interface IWarehouseOrderTotal {
    warehouseCode:string;
    warehouseName:string;
    totalOrder:number
  }

  interface IDaily {
    date: Date;
    warehouseCode: string;
    warehouseName:string;
    reasons: IReason[];
  }

  interface IReason {
    reason: string;
    times:number;
  }
interface IOrderStatistical {
    delivered : number;
    deliveryFail: number;
    inStore: number;
    returned: number;
}  

interface IDateSelect {
    from: string;
    to: string;
    warehouseCode: string;
  }

