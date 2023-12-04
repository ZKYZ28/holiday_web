import { NavLink, To } from 'react-router-dom';

type ButtonLinkProps = {
  text: string;
  to: To;
};

function ButtonLink({ to, text }: ButtonLinkProps) {
  return (
    <NavLink to={to}>
      <li className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">{text}</li>
    </NavLink>
  );
}

export default ButtonLink;
