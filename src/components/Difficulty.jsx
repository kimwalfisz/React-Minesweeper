export default function Difficulty({ onChangeDiff }) {
  return (
    <select className="difficulty" name="difficulty" onChange={onChangeDiff} defaultValue={0}>
      <option value={0}>easy</option>
      <option value={1} >medium</option>
      <option value={2}>hard</option>
    </select>
  );
}
