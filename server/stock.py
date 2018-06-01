import easyquotation as quot
import json

f = open('stockdata.csv', 'w')

stockCode = '00700'
q = quot.use('sina')
print(q.stocks([stockCode]))

q = quot.use('daykline')
data = q.real(stockCode)
 
json.dump(data, f)
# f.write(dataStr)
f.close()
