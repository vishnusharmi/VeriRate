import PropTypes from "prop-types";

// Reusable SettingToggle Component
const SettingToggle = ({ title, description, icon, enabled, onToggle }) => {
  return (
    <div className="border-b py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800 flex items-center">
          {icon} {title}
        </h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={onToggle}
          />
          <div
            className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
              enabled ? "peer-checked:bg-blue-600" : ""
            }`}
          ></div>
        </label>
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
