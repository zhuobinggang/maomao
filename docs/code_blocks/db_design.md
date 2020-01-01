## order表
1. id: 5
2. username: "kobakoisme"
3. item_url: "maomaojp.org:8088/?mid=m38055257794"
4. item_title: "オシアナス マンタ OCW-S3000-1AJF"
5. state: 1 (1 待支付 2 等待賣家發貨 3 賣家已發貨 4 已收貨 5 已退款)
6. created_time: "2019-12-27 14:12:55"
7. updated_time:

### state表FMS

#### 通過轉運公司情況

正常情況

待支付 -> 等待賣家發貨 ->  賣家已發貨(顯示單號) -> 已收貨

付款之後被買走

待支付 -> 等待賣家發貨 ->  已退款

根據上述分析設定state為: 1 待支付 2 等待賣家發貨 3 賣家已發貨 4 已收貨 5 已退款

## 