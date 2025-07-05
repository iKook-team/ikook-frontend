import React from "react";

interface TextSectionProps {
  title: string;
  content: string;
  editable?: boolean;
  onEdit?: (newContent: string) => void;
}

export const TextSection: React.FC<TextSectionProps> = ({
  title,
  content,
  editable = false,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editContent, setEditContent] = React.useState(content);

  const handleEdit = () => {
    if (editable) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (onEdit) {
      onEdit(editContent);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <section className="flex w-[488px] flex-col items-start gap-[9px] max-md:w-full">
      <h3 className="text-black text-[15px] font-medium max-sm:text-sm">
        {title}
      </h3>
      {isEditing ? (
        <div className="w-full">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-[#F9DF98] rounded-md text-[#6F6E6D] text-xs font-light max-sm:text-[11px] resize-none focus:outline-none focus:ring-2 focus:ring-[#F9DF98]"
            rows={3}
            aria-label={`Edit ${title}`}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#F9DF98] text-[#3F3E3D] text-xs rounded hover:opacity-80 transition-opacity"
              type="button"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-[#B7B7B6] text-[#3F3E3D] text-xs rounded hover:opacity-80 transition-opacity"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`text-[#6F6E6D] text-xs font-light max-sm:text-[11px] ${
            editable
              ? "cursor-pointer hover:bg-[#FFFCF5] p-1 rounded transition-colors"
              : ""
          }`}
          onClick={handleEdit}
          role={editable ? "button" : "text"}
          tabIndex={editable ? 0 : undefined}
          onKeyDown={
            editable ? (e) => e.key === "Enter" && handleEdit() : undefined
          }
          aria-label={editable ? `Click to edit ${title}` : undefined}
        >
          {content}
        </div>
      )}
    </section>
  );
};
