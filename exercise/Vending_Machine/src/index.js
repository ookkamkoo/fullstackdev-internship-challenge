import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardDeck, Card } from 'react-bootstrap';

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Total:0,
      Total_Monney:0
    };
  }

  componentDidMount() {
    fetch("https://www.mocky.io/v2/5c77c5b330000051009d64c9")
      .then(res => res.json())
      .then(result => {
          this.setState({
            data: result.data,
            Total: result.total
          });
        },
      )
  }
   Add_Money_1(){
        this.setState(
          state =>({
            Total_Monney: state.Total_Monney+1
          })
          );}
  Add_Money_2(){
        this.setState(
          state =>({
            Total_Monney: state.Total_Monney+2
          })
          );}
  Add_Money_5(){
        this.setState(
          state =>({
            Total_Monney: state.Total_Monney+5
          })
          );}
  Add_Money_10(){
        this.setState(
          state =>({
            Total_Monney: state.Total_Monney+10
          })
          );}
  Cancel(){
        let TotalM = this.state.Total_Monney
        let change_1,change_2,change_5,change_10;
        change_10 =  Math.floor(TotalM/10)     
        TotalM =  TotalM%10
        change_5  = Math.floor(TotalM/5)
        TotalM =  TotalM%5
        change_2  = Math.floor(TotalM/2)
        TotalM =  TotalM%2 
        change_1  = Math.floor(TotalM/1)
        TotalM =  TotalM%1
        alert(`เงินทอน ${this.state.Total_Monney} บาท \nเหรียญ 10 :  ${change_10} \nเหรียญ 5 :   ${change_5}  \nเหรียญ 2 :   ${change_2}  \nเหรียญ 1 :    ${change_1}`)
        this.setState(
            {Total_Monney:0}
          );
  }
  Select_Drink(Name,Price,Stock){
        if(Stock===false){
          alert('สินค้าหมด')
        }
        else{
          if(Price > this.state.Total_Monney ){
              alert('เงินไม่พอ กรุณาหยอดเงินเพิ่ม')
          }
          else{
              alert('คุณได้รับ ' + Name)
              this.setState(
                state =>({
                  Total_Monney: state.Total_Monney-Price
                })
                );
          }
        }
  }
  render() {
      const Data  = this.state.data;  
        return (
          
          <div style={{margin:'2%'}}>
            <h3 style={{textAlign:"center"}}><b>Drinking water vending machine</b></h3>
            <h5 style={{textAlign:"center"}}>1. Put coin   2. Select warter</h5>

            <Card.Body style={{paddingLeft:'3%'}}>
            <Card.Title><h3><b>หยอดเหรียญ</b></h3></Card.Title>
            <h4>เงินทั้งหมด : {this.state.Total_Monney} </h4>
            <Card.Text>
                <Button variant="primary" id = '2'onClick={this.Add_Money_1.bind(this)}>1 บาท</Button> {}  
                <Button variant="primary" onClick={this.Add_Money_2.bind(this)}>2 บาท</Button> {}
                <Button variant="primary" onClick={this.Add_Money_5.bind(this)}>5 บาท</Button> {}
                <Button variant="primary" onClick={this.Add_Money_10.bind(this)}>10 บาท</Button> {}
            </Card.Text>
            <Button variant="primary" onClick={this.Cancel.bind(this)}>ยกเลิก</Button>
          </Card.Body>
          <h6>จำนวนสินค้าทั้งหมด : {this.state.Total} ชนิด</h6>
            <CardDeck>
           { Data.map(item => (
                <Card>
                <Card.Img src={item.image} style={{ width: '100%', height: '50%' }}/>
                <Card.Body>
                  <Card.Title><b>{item.name}</b></Card.Title>
                  <Card.Text>
                    ราคา : {item.price}<div></div>
                    สินค้าในคลัง : {item.in_stock?'มี':'หมด'}
                  </Card.Text>
                  <div style={{textAlign:"center"}}>
                  <Button variant="primary" onClick={this.Select_Drink.bind(this,item.name,item.price,item.in_stock) }>{item.in_stock?'เลือก':'หมด'}</Button>
                  </div>
                </Card.Body>
              </Card>  
                )
           )
           }
           </CardDeck>
           </div>
        );
      }    
  }
export default Data;
ReactDOM.render(<Data/>, document.getElementById('root'));
