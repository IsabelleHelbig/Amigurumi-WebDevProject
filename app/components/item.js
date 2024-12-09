export default function Item({ name, photoUrl }) {
  return (
    <ul className=" bg-slate-200 text-white p-3 rounded-md outline outline-2 outline-slate-300 m-2">
      {photoUrl && <img src={photoUrl} alt={name} className="mt-2 rounded" />}
      <li className="text-xl font-bold text-red-400">{name}</li>
    </ul>
  );
}
