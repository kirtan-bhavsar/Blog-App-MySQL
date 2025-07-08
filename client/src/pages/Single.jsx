import React from "react";
import person from "../img/person.jpg";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link } from "react-router-dom";
import Menu from "../components/Menu.jsx";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img src={person} alt="img" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 weeks ago</p>
          </div>
          <div className="edit">
            <Link to="/write?edit=2">
              <img src={Edit} alt="edit" />
            </Link>
            <img src={Delete} alt="delete" />
          </div>
        </div>
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur,
          veritatis.
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          voluptatum assumenda, alias sunt, dolore nemo esse velit amet, debitis
          impedit necessitatibus nobis eos? Excepturi dicta molestiae, minima
          pariatur harum quis odio hic laborum illo nam ducimus facilis dolore
          possimus labore soluta similique. Eos harum dolorem sapiente placeat
          vitae dolor exercitationem officiis ad quia dignissimos corrupti,
          officia iusto voluptatum ratione atque quas repudiandae tempore earum
          nulla amet? Mollitia optio commodi dolores nobis nam, tempora delectus
          quibusdam quia sequi! Quo, quasi. Corporis atque pariatur tempora ea
          provident vitae, optio vero, necessitatibus laudantium saepe quidem
          perspiciatis architecto dolorum natus! Corporis, illum perferendis?
          Sit exercitationem ut similique sed magni minima, eaque delectus
          voluptatem eligendi.
          <br />
          <br />
          Voluptate, impedit? Ab consectetur unde eos aperiam ea quis harum,
          architecto eligendi. Libero, provident facere repellendus accusantium,
          illo rerum accusamus saepe, vel cumque esse dolores unde dicta magni.
          Fuga, doloremque. Voluptates, et repudiandae, in quisquam amet quod a
          itaque tenetur pariatur recusandae fuga facilis soluta reprehenderit
          hic animi maiores at dolore cupiditate blanditiis. Delectus pariatur,
          nihil explicabo consequatur fugiat alias. Dicta ipsa repellendus
          exercitationem ab doloribus nesciunt aperiam autem sapiente rerum
          tempora, labore ratione minima facere odio earum nostrum deleniti
          fugit error. Quo eligendi, aperiam porro ad soluta excepturi in at
          odit blanditiis corporis aut hic!
          <br></br>
          <br />
          Praesentium asperiores facere esse pariatur quia facilis ea eius vel
          distinctio consequuntur ipsam assumenda ab maiores alias nostrum, odit
          dolores ut culpa voluptates itaque inventore iure. Dolor quod ut,
          consectetur labore consequatur quam fugiat quo. Ut incidunt quod rerum
          quis. Corporis voluptate, qui repellat porro beatae obcaecati
          doloremque non est voluptas accusamus sequi quisquam dignissimos dicta
          unde dolorum error et quod quidem pariatur, officia tenetur quae aut
          ipsam! Provident aliquid quia aliquam dolore, quasi minus blanditiis
          reprehenderit quos vero praesentium ullam sint illum fuga rem.
          Voluptates, debitis, blanditiis saepe impedit soluta quisquam nobis
          dolor quod quam voluptas eligendi molestiae dolore tenetur voluptatem
          dolorem earum qui natus?
          <br></br>
          <br />
          Est dolores soluta at unde magnam aliquam delectus aliquid iure iusto,
          odio dolor quia illum consequatur assumenda, deleniti, sint ipsa eius
          culpa excepturi perspiciatis! Est iure porro similique inventore
          voluptatum, autem provident atque nostrum voluptas eos aspernatur eius
          odio suscipit impedit repudiandae incidunt qui doloremque,
          reprehenderit maiores, tempora quisquam eligendi quo repellat ad!
          Dolorum dignissimos blanditiis accusantium saepe iure, a atque, iusto
          ratione assumenda nemo quibusdam illum natus quae architecto ipsum
          voluptatem fuga. Dignissimos ipsam fugit adipisci sed illum, fuga eum
          officia temporibus optio maxime assumenda ducimus totam distinctio
          esse ipsum nisi ut eveniet dolorem dolor veritatis vitae quae
          necessitatibus tenetur!
        </p>
      </div>
      <Menu></Menu>
    </div>
  );
};

export default Single;
