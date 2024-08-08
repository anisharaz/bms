import ActionRenderer from "./ActionRenderer";
import CreateForm from "./CreateForm";
import "./createblink.css";
async function CreateBlinkForm({
  params,
}: {
  params: { createblinkid: string };
}) {
  return (
    <div className="main">
      <div className="main-child-1 bg-slate-300">
        <CreateForm />
      </div>
      <div className="main-child-2 bg-red-200">
        <ActionRenderer ActionUrl="https://solaction.aaraz.me/" />
      </div>
    </div>
  );
}

export default CreateBlinkForm;
