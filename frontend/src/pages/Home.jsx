import "../styles/home.css";
import FeatureItem from "../components/FeatureItem";
import IconChat from "../assets/icon-chat.png";
import IconMoney from "../assets/icon-money.png";
import IconSecurity from "../assets/icon-security.png";

const Home = () => {
  const featureItemContent = [
    {
      icon: IconChat,
      title: "You are our #1 priority",
      description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes. "
    },
    {
      icon: IconMoney,
      title: "More savings means higher rates",
      description: "The more you save with us, the higher your interest rate will be! "
    },
    {
      icon: IconSecurity,
      title: "Security you can trust",
      description: "We use top of the line encryption to make sure your data and money is always safe. "
    }
  ];

  return (
    <div className="home">
      <div className="home__hero">
        <section className="hero__content">
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>

      </div>
      <section className="feature-item-container">
        <h2 className="sr-only">Features</h2>
        {featureItemContent.map((item, index) => (
          <FeatureItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;