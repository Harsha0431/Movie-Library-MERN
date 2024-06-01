import { Link } from "react-router-dom";
import Camera from "../assets/camera.svg";

export default function NavbarView() {
  return (
    <Link to={"/"}>
      <button className="flex py-1 px-2 mb-1.5 justify-center items-center text-center ">
        <img
          src={Camera}
          alt={"MovieHub Logo"}
          className="size-16 md:size-20"
        />
        <h2 className="font-josefin text-[calc(22px+0.2dvw)] md:text-[calc(24px+0.2dvw)]">
          MovieHub
        </h2>
      </button>
    </Link>
  );
}
