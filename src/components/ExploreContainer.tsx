import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import { useEffect, useState } from "react";
import { getAllLocations } from "../api/covid";
import "./ExploreContainer.css";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [latest, setLatest] = useState<any>({});

  useEffect(() => {
    getAllLocations().then((data) => setLatest((data as any).latest));
  });

  return (
    <div className="container">
      <IonCard style={{ padding: "20px" }}>
        <IonCardTitle>Total Cases</IonCardTitle>
        <IonCardContent>{latest ? latest.confirmed : null}</IonCardContent>
      </IonCard>
      <IonCard style={{ padding: "20px" }}>
        <IonCardTitle>Total Deaths</IonCardTitle>
        <IonCardContent>{latest ? latest.deaths : null}</IonCardContent>
      </IonCard>
    </div>
  );
};

export default ExploreContainer;
