import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getAllLocations } from "../api/covid";

const Tab1: React.FC = () => {
  const [locations, setLocations] = useState([]);

  const [location, setLocation] = useState<any>(0);
  const [age, setAge] = useState<any>(0);

  const [res, setRes] = useState<any>(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let result =
      (locations[location] as any).latest.confirmed /
      (locations[location] as any).country_population;
    result = result * 100;
    setRes(result);
  };

  useEffect(() => {
    getAllLocations().then((data) => setLocations((data as any).locations));
  }, [locations]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculate Risk</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calculate Risk</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard style={{ padding: "15px" }}>
          <form onSubmit={handleSubmit}>
            <IonLabel>Country:</IonLabel>
            <IonSelect
              mode="md"
              name="location"
              interface="action-sheet"
              value={location}
              onIonChange={(e) => setLocation(e.detail.value)}
              placeholder="Country"
            >
              {locations.map((l: any) => (
                <IonSelectOption key={l.id} value={l.id}>
                  {l.country} {l.province.length > 0 ? `(${l.province})` : null}
                </IonSelectOption>
              ))}
            </IonSelect>
            <IonLabel>Age:</IonLabel>
            <IonInput
              type="number"
              name="age"
              value={age}
              onIonChange={(e) => setAge(e.detail.value)}
            />
            <IonButton color="primary" expand="block" type="submit">
              Submit
            </IonButton>
          </form>
        </IonCard>
        {res > 0
          ? `Your Infection percentage is ${
              age > 30 ? Math.round(res * 100) : Math.round(res * 100 - 10)
            }%`
          : "Click submit"}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
