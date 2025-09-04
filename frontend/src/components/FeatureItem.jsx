import "../styles/FeatureItem.css";

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="feature-item">
      <img src={icon} alt={title} className="feature-item__icon" />
      <h3 className="feature-item__title">{title}</h3>
      <p className="feature-item__description">{description}</p>
    </div>
  );
};

export default FeatureItem;
