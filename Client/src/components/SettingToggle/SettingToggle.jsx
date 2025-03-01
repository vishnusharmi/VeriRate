import PropTypes from "prop-types";

// Reusable SettingToggle Component
const SettingToggle = ({ title, description, icon, enabled, onToggle }) => {
  return (
    <div className="border-b py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          {icon} {title}
        </h3>
        <button
          onClick={onToggle}
          className={`px-4 py-2 text-white rounded-md transition ${
            enabled ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

SettingToggle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SettingToggle;
