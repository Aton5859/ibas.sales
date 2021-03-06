﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace businesspartner {
    /** 模块-标识 */
    export const CONSOLE_ID: string = "2bd803fd-975c-4f7c-aa41-1ca2991cc126";
    /** 模块-名称 */
    export const CONSOLE_NAME: string = "BusinessPartner";
    /** 模块-版本 */
    export const CONSOLE_VERSION: string = "0.1.0";

    export namespace bo {
        /** 业务仓库名称 */
        export const BO_REPOSITORY_BUSINESSPARTNER: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
        /** 业务对象编码-业务伙伴地址 */
        export const BO_CODE_ADDRESS: string = "${Company}_BP_ADDRESS";
        /** 业务对象编码-业务伙伴组 */
        export const BO_CODE_BUSINESSPARTNERGROUP: string = "${Company}_BP_BPGROUP";
        /** 业务对象编码-业务伙伴联系人 */
        export const BO_CODE_CONTACTPERSON: string = "${Company}_BP_CONTACTPERSON";
        /** 业务对象编码-客户 */
        export const BO_CODE_CUSTOMER: string = "${Company}_BP_CUSTOMER";
        /** 业务对象编码-供应商 */
        export const BO_CODE_SUPPLIER: string = "${Company}_BP_SUPPLIER";


        /** 业务伙伴性质 */
        export enum emBusinessPartnerNature {
            /** 公司 */
            COMPANY,
            /** 私人 */
            PRIVATE,
        }
        /** 业务伙伴类型 */
        export enum emBusinessPartnerType {
            /** 客户 */
            CUSTOMER,
            /** 供应商 */
            SUPPLIER,
        }
        /** 性别 */
        export enum emGender {
            /** 男 */
            MALE,
            /** 女 */
            FEMALE,
        }
    }

    export namespace app {
        /** 单据收款服务契约 */
        export interface IReceiptContract extends ibas.IServiceContract {
            /** 业务伙伴类型 */
            businessPartnerType: bo.emBusinessPartnerType;
            /** 业务伙伴代码 */
            businessPartnerCode: string;
            /** 总计 */
            total: number;
            /** 货币 */
            currency: string;
            /** 单据类型 */
            documentType?: string;
            /** 单据标识 */
            documentEntry?: number;
            /** 单据行号 */
            documentLineId?: number;
        }
        /** 单据收款服务服务代理 */
        export class ReceiptServiceProxy extends ibas.ServiceProxy<IReceiptContract[]> {

        }
        /** 单据付款服务契约 */
        export interface IPaymentContract extends ibas.IServiceContract {
            /** 业务伙伴类型 */
            businessPartnerType: bo.emBusinessPartnerType;
            /** 业务伙伴代码 */
            businessPartnerCode: string;
            /** 总计 */
            total: number;
            /** 货币 */
            currency: string;
            /** 单据类型 */
            documentType?: string;
            /** 单据标识 */
            documentEntry?: number;
            /** 单据行号 */
            documentLineId?: number;
        }
        /** 单据付款服务服务代理 */
        export class PaymentServiceProxy extends ibas.ServiceProxy<IPaymentContract[]> {

        }
        /** 查询条件 */
        export namespace conditions {
            export namespace customer {
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "validDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "validDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = "validDate";
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "invalidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "invalidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = "invalidDate";
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.bracketClose = 1;
                    condition.alias = "deleted";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace supplier {
                /** 默认查询条件 */
                export function create(): ibas.IList<ibas.ICondition> {
                    let today: string = ibas.dates.toString(ibas.dates.today(), "yyyy-MM-dd");
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 激活的
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 有效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "validDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "validDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = "validDate";
                    condition.operation = ibas.emConditionOperation.LESS_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 失效日期
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "invalidDate";
                    condition.operation = ibas.emConditionOperation.IS_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.relationship = ibas.emConditionRelationship.OR;
                    condition.bracketOpen = 1;
                    condition.alias = "invalidDate";
                    condition.operation = ibas.emConditionOperation.NOT_NULL;
                    conditions.add(condition);
                    condition = new ibas.Condition();
                    condition.bracketClose = 2;
                    condition.alias = "invalidDate";
                    condition.operation = ibas.emConditionOperation.GRATER_EQUAL;
                    condition.value = today;
                    conditions.add(condition);
                    // 没删除
                    condition = new ibas.Condition();
                    condition.bracketClose = 1;
                    condition.alias = "deleted";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.NO.toString();
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace contactperson {
                export function create(type: bo.emBusinessPartnerType, bpCode: string): ibas.IList<ibas.ICondition> {
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 类型
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "ownerType";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = type.toString();
                    conditions.add(condition);
                    // 激活的
                    condition = new ibas.Condition();
                    condition.alias = "activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 业务伙伴编码
                    condition = new ibas.Condition();
                    condition.bracketClose = 1;
                    condition.alias = "businessPartner";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = bpCode;
                    conditions.add(condition);
                    return conditions;
                }
            }
            export namespace address {
                export function create(type: bo.emBusinessPartnerType, bpCode: string): ibas.IList<ibas.ICondition> {
                    let condition: ibas.ICondition;
                    let conditions: ibas.IList<ibas.ICondition> = new ibas.ArrayList<ibas.ICondition>();
                    // 类型
                    condition = new ibas.Condition();
                    condition.bracketOpen = 1;
                    condition.alias = "ownerType";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = type.toString();
                    conditions.add(condition);
                    // 激活的
                    condition = new ibas.Condition();
                    condition.alias = "activated";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = ibas.emYesNo.YES.toString();
                    conditions.add(condition);
                    // 业务伙伴编码
                    condition = new ibas.Condition();
                    condition.bracketClose = 1;
                    condition.alias = "businessPartner";
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = bpCode;
                    conditions.add(condition);
                    return conditions;
                }
            }

        }
    }
}