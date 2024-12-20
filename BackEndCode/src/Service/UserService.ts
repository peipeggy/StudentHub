import { Service } from "../abstract/Service";
import { Student } from "../interfaces/Student";
import { logger } from "../middlewares/log";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { Document } from "mongoose"
import { MongoDB } from "../utils/MongoDB";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";

type seatInfo = {
    schoolName:string,
    department:string,
    seatNumber:string
}

export class UserService extends Service {

    public async getAllStudents(): Promise<Array<DBResp<Student>>|undefined> {
        try {
            const res:Array<DBResp<Student>> = await studentsModel.find({});
            return res;
        } catch (error) {
            return undefined;
        }
        
    }

    /**
     * 新增學生
     * @param info 學生資訊
     * @returns resp
     */
    public async insertOne(info: Student): Promise<resp<DBResp<Student>|undefined>>{

        const current = await this.getAllStudents()
        const resp:resp<DBResp<Student>|undefined> = {
            code: 200,
            message: "",
            body: undefined
        }

        if (current && current.length>0) {
            try{
                const nameValidator = await this.userNameValidator(info.userName);
                if (current.length>=200) {
                    resp.message = "student list is full";
                    resp.code = 403;
                }else{
                    if (nameValidator === "驗證通過") {
                        info.sid = String(current.length+1) ;
                        info._id = undefined;
                        const res = new studentsModel(info);
                        resp.body = await res.save();
                    }else{
                        resp.code = 403;
                        resp.message = nameValidator;
                    }
                }
            } catch(error){
                resp.message = "server error";
                resp.code = 500;
            }
        }else{
            resp.message = "server error";
            resp.code = 500;
        }

        return resp;

    }

    /**
     * 學生名字驗證器
     * @param userName 學生名字
     * tku ee 0787
     * ee 科系縮寫
     *  0787 四碼
     * 座號檢查，跟之前有重複就噴錯  只能寫沒重複的號碼
     */
    public async userNameValidator(userName: string): Promise<
    '學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760' | '座號已存在' | '校名必須為 tku' | '座號格式不正確，必須為四位數字。' | '驗證通過'
    > {

        if (userName.length < 7) { 
            return ('學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760');
        }

        const info = this.userNameFormator(userName);

        if (info.schoolName !== 'tku') {
            return '校名必須為 tku';
        }
    
        // 驗證座號(正則不想寫可以給 gpt 寫, 記得測試就好)
        const seatNumberPattern = /^\d{4}$/; // 驗證4個數字
        
        if (!seatNumberPattern.test(info.seatNumber)) {
            return '座號格式不正確，必須為四位數字。';
        }

        if (await this.existingSeatNumbers(info.seatNumber)) {
            return '座號已存在'
        }

        return '驗證通過'
        
    }

    /**
     * 用戶名格式化
     * @param userName 用戶名
     * @returns seatInfo
     */
    public userNameFormator(userName: string){
        const info:seatInfo = {
            schoolName: userName.slice(0, 3),
            department: userName.slice(3, userName.length - 4),
            seatNumber: userName.slice(-4)
        }
        return info
    }

    /**
     * 檢查用戶名是否存在
     * @param SeatNumber 
     * @returns boolean
     */
    public async existingSeatNumbers(SeatNumber:string):Promise<boolean>{
        const students = await this.getAllStudents();
        let exist = false
        if (students) {
            students.forEach((student)=>{
                const info = this.userNameFormator(student.userName)
                if (info.seatNumber === SeatNumber) {
                    exist = true;
                }
            })
        }
        return exist
    }
    
    public async UpdateByUserName(info: Student) {
        const resp: resp<DBResp<Student> | undefined> = {
          code: 200,
          message: "",
          body: undefined,
        };
    
        const user = await studentsModel.findOne({ userName: info.userName });
    
        const allowedFields = ["name", "department", "grade", "class", "Email", "absences"];
    
        // 檢查 info 的所有字段是否存在
        for (const key in info) {
          if (info[key as keyof Student] === undefined || info[key as keyof Student] === null) {
            resp.code = 400;
            resp.message = `Invalid input: ${key} is missing or undefined`;
            return resp;
          }
        }
    
        if (user) {
          try {
            Object.assign(user, info);
            await user.save();
            resp.body = user;
            resp.message = "update success";
          } catch (error) {
            resp.code = 500;
            resp.message = error as string;
          }
        } else {
          resp.code = 404;
          resp.message = "user not found";
        }
        return resp;
      }
    
    
      public async deleteBySId(sid: string) {
        const resp: resp<any> = {
            code: 200,
            message: "",
            body: undefined,
        };
    
        // Step 1: 檢查 sid 是否為空值或不合法
        if (!sid || sid.trim() === "") {
            resp.code = 400;
            resp.message = "Invalid sid: cannot be empty.";
            return resp;
        }
    
        const sidPattern = /^[1-9]\d*$/; // sid 必須為正整數
        if (!sidPattern.test(sid)) {
            resp.code = 400;
            resp.message = "Invalid sid: must be a positive integer.";
            return resp;
        }
    
        try {
            // Step 2: 檢查 sid 是否存在於資料庫中
            const user = await studentsModel.findOne({ sid: sid });
            if (!user) {
                resp.code = 404;
                resp.message = "User not found with the provided sid.";
                return resp;
            }
    
            // Step 3: 執行刪除操作
            const res = await studentsModel.deleteOne({ sid: sid });
            if (res.deletedCount === 1) {
                resp.message = "Success: User deleted.";
                resp.body = res;
            } else {
                resp.code = 500;
                resp.message = "Deletion failed due to unknown reasons.";
            }
        } catch (error) {
            // Step 4: 捕獲資料庫操作錯誤
            resp.code = 500;
            resp.message = `Server error: ${error}`;
        }
    
        return resp;
    }
    
    
}