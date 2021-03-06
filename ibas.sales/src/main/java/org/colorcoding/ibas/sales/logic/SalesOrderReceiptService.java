package org.colorcoding.ibas.sales.logic;

import org.colorcoding.ibas.bobas.data.Decimal;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.logic.BusinessLogicException;
import org.colorcoding.ibas.bobas.mapping.LogicContract;
import org.colorcoding.ibas.sales.bo.salesorder.ISalesOrder;
import org.colorcoding.ibas.sales.bo.salesorder.ISalesOrderItem;

/**
 * 销售订单-交货服务
 * 
 * @author Niuren.Zhu
 *
 */
@LogicContract(ISalesOrderReceiptContract.class)
public class SalesOrderReceiptService extends SalesOrderService<ISalesOrderReceiptContract> {

	@Override
	protected ISalesOrder fetchBeAffected(ISalesOrderReceiptContract contract) {
		return this.fetchBeAffected(contract.getBaseDocumentType(), contract.getBaseDocumentEntry());
	}

	@Override
	protected void impact(ISalesOrderReceiptContract contract) {
		if (this.getBeAffected() == null) {
			return;
		}
		ISalesOrderItem orderItem = this.getBeAffected().getSalesOrderItems()
				.firstOrDefault(c -> c.getLineId().compareTo(contract.getBaseDocumentLineId()) == 0);
		if (orderItem == null) {
			throw new BusinessLogicException(I18N.prop("msg_ph_not_found_order_item", contract.getBaseDocumentType(),
					contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));
		}
		Decimal closedQuantity = orderItem.getClosedQuantity();
		if (closedQuantity == null) {
			closedQuantity = Decimal.ZERO;
		}
		closedQuantity = closedQuantity.add(contract.getQuantity());
		orderItem.setClosedQuantity(closedQuantity);
	}

	@Override
	protected void revoke(ISalesOrderReceiptContract contract) {
		if (this.getBeAffected() == null) {
			return;
		}
		ISalesOrderItem orderItem = this.getBeAffected().getSalesOrderItems()
				.firstOrDefault(c -> c.getLineId().compareTo(contract.getBaseDocumentLineId()) == 0);
		if (orderItem == null) {
			throw new BusinessLogicException(I18N.prop("msg_sl_not_found_order_item", contract.getBaseDocumentType(),
					contract.getBaseDocumentEntry(), contract.getBaseDocumentLineId()));
		}
		Decimal closedQuantity = orderItem.getClosedQuantity();
		if (closedQuantity == null) {
			closedQuantity = Decimal.ZERO;
		}
		closedQuantity = closedQuantity.subtract(contract.getQuantity());
		orderItem.setClosedQuantity(closedQuantity);
	}

}