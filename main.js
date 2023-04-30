/*  Дано 3 блоки
       1. В лівій частині сторінки - перелік категорій.
       2. При натисканні на категорію в середній блок виводиться список товарів цієї категорії.
       3. Клік на товар - інформацію про товар у правому блоці.
       4. В інформації товару - кнопка “купити”.
       5. При натисканні на “купити” з'являється повідомлення, що товар куплений і повернення у вихідний
          стан програми ( коли відображається лише список категорій).
 */

          const catalogItems = document.querySelectorAll(".catalogItem");
          const productLists = document.querySelectorAll(".productList");
          const descriptions = document.querySelectorAll(".descriptionText");
          const buyButton = document.querySelector("#descriptionBtn");
          
          const catalogItemsCount = catalogItems.length;
          
          let currentDescription;
          
          catalogItems.forEach((catalogItem, index) => {
              catalogItem.addEventListener("click", () => {
                  for (let i = 0; i < catalogItemsCount; i++) {
                      if (i !== index) {
                          productLists[i].style.display = "none";
                      }
                  }
                  productLists[index].style.display = "block";
              });
          });
          
          productLists.forEach((productList) => {
              productList.addEventListener("click", (event) => {
                  const productItem = event.target.closest('.productItem');
                  if (productItem) {
                      const productListIndex = Array.from(productLists).indexOf(productList);
                      for (let j = 0; j < descriptions.length; j++) {
                          descriptions[j].style.display = "none";
                      }
                      currentDescription = descriptions[productListIndex * 4 + Array.from(productList.children).indexOf(productItem)];
                      currentDescription.style.display = "block";
                      buyButton.style.display = "block";
                  }
              });
          });
          
          buyButton.addEventListener("click", () => {
              productLists.forEach((productList) => {
                  productList.style.display = "none";
              });
              descriptions.forEach((description) => {
                  description.style.display = "none";
              });
              buyButton.style.display = "none";
              boxForm.style.display = "block";
          });
          
          const form = document.querySelector('.box2Form');
          const tableName = document.querySelector('#tableName');
          const tableCity = document.querySelector('#tableCity');
          const tableNovaPoshta = document.querySelector('#tableNovaPoshta');
          const tabPayment = document.querySelector('#tablePayment');
          const tableQuantity = document.querySelector('#tableQuantity');
          const tableComment = document.querySelector('#tableComment');
          const tableProduct = document.querySelector('#tableProduct');
          const boxForm = document.querySelector('.box2Description');
          const boxTable = document.querySelector('.box2Check');
          
          form.addEventListener('submit', (event) => {
              event.preventDefault();
              const name = form.elements.name.value;
              const city = form.elements.city.value;
              const novaPoshta = form.elements['novaPoshta'].value;
              const payment = form.elements.payment.value;
              const quantity = form.elements.quantity.value;
              const comment = form.elements.comment.value;
          
              if (!name || !city || !novaPoshta || !payment || !quantity || !comment) {
                  alert("Ви не заповнили всі поля");
                  return;
              }
              tableName.textContent = name;
              tableCity.textContent = city;
              tableNovaPoshta.textContent = novaPoshta;
              tabPayment.textContent = payment;
              tableQuantity.textContent = quantity;
              tableComment.textContent = comment;
              tableProduct.innerHTML = currentDescription.innerHTML;
              boxForm.style.display = 'none';
              boxTable.style.display = 'flex';
          });
          
          const orders = document.querySelector(".orders");
          const btmBlock = document.querySelector("#blockBtn")
          const boxSection = document.querySelector(".box");
          
          btmBlock.addEventListener("click", () => {
              boxSection.style.display = "none";
              boxForm.style.display = 'none';
              boxTable.style.display = 'none';
              orders.style.display = "flex";
          })
          
          const ordersList = document.querySelector('.ordersList');
          
          const createOrderElement = (orderId, orderData) => {
              const orderDiv = document.createElement('div');
              orderDiv.classList.add('order');
          
              const orderDescription = document.createElement('div');
              orderDescription.classList.add('ordersDescription');
              orderDescription.textContent = orderData;
          
              const createdTimeElem = document.createElement('p');
              const orderDate = new Date(parseInt(orderId));
              const formattedOrderDate = orderDate.toLocaleString();
              createdTimeElem.textContent = `Час створення: ${formattedOrderDate}`;
              createdTimeElem.classList.add('created-time');
          
              createdTimeElem.addEventListener('click', () => {
                  const { name, city, novaPoshta, payment, quantity, comment } = JSON.parse(orderData);
          
                  const message = `ПІБ: ${name}<br>Місто: ${city}<br>Адреса нової пошти: ${novaPoshta}<br>Спосіб оплати: ${payment}<br>Кількість продукції: ${quantity}<br>Комментар: ${comment}`;
          
                  const messageElem = document.querySelector('#messageElem');
                  if (messageElem) {
                      messageElem.parentNode.removeChild(messageElem);
                  } else {
                      const newMessageElem = document.createElement('div');
                      newMessageElem.innerHTML = message;
                      newMessageElem.style.marginTop = '10px';
                      newMessageElem.id = 'messageElem';
                      createdTimeElem.parentNode.insertBefore(newMessageElem, createdTimeElem.nextSibling);
                  }
              });
          
              const deleteBtn = document.createElement('p');
              deleteBtn.textContent = 'Видалити';
              deleteBtn.classList.add('deleteBtn');
          
              deleteBtn.addEventListener('click', () => {
                  localStorage.removeItem(orderId);
                  orderDiv.remove();
              });
          
              orderDiv.appendChild(createdTimeElem);
              orderDiv.appendChild(deleteBtn);
          
              return orderDiv;
          }
          
          form.addEventListener('submit', (event) => {
              event.preventDefault();
              const name = form.elements.name.value;
              const city = form.elements.city.value;
              const novaPoshta = form.elements['novaPoshta'].value;
              const payment = form.elements.payment.value;
              const quantity = form.elements.quantity.value;
              const comment = form.elements.comment.value;
          
              if (!name || !city || !novaPoshta || !payment || !quantity || !comment) {
                  return;
              }
          
              const order = {
                  name,
                  city,
                  novaPoshta,
                  payment,
                  quantity,
                  comment,
                  created: new Date().toLocaleString(),
              };
          
              const orderId = Date.now().toString();
              localStorage.setItem(orderId, JSON.stringify(order));
              const orderElement = createOrderElement(orderId, JSON.stringify(order));
              ordersList.appendChild(orderElement);
              form.reset();
          });
          
          window.addEventListener('load', () => {
              for (let i = 0; i < localStorage.length; i++) {
                  const orderId = localStorage.key(i);
                  const orderData = localStorage.getItem(orderId);
                  const orderElement = createOrderElement(orderId, orderData);
                  ordersList.appendChild(orderElement);
              }
          });
          
          