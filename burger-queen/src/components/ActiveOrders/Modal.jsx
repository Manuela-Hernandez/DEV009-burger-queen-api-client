import { useState} from "react";

export default function Modal({isopen=false, productsModal=[]}) {
  const [closed, setClosed] = useState(false)

  return (
    <div>
      {isopen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items center">
          <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
            <div>
              {
                productsModal.map((product) => (
                  console.log("product", product),
                  <p key={product.product.id}>{product.product.name + product.quantity}</p>
                ))
              }
            </div>
            <div>
              <button onClick={()=> setClosed(true)}> close</button>
            </div>
          </div>
        </div>
      )
    }
    </div>
  )
}