import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContent } from '../components/ScreenContent';
import { StyleSheet, View, FlatList, ActivityIndicator, Image, Text } from 'react-native';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';
import { useEffect, useState} from 'react';
import Details from './details';
import { TouchableOpacity } from 'react-native-gesture-handler';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  // const Overview = ({ navigation }) => {
  // };
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try{
        const response = await fetch('https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json');
        const json = await response.json();
        setMovies(json.movies);
      } catch (error){
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  // console.log(movies)
  
  if (loading) {
    return <ActivityIndicator size="large"/>
  }

  return (
    <View style={styles.container}>
      {/* <ScreenContent path="screens/overview.tsx" title="Overview" /> */}
      <Text>Teste</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          <TouchableOpacity onPress={()=> navigation.navigate('Details', {movieDetails:item})}>
            {/* <Image></Image> */}
            <Text>{item.movies}</Text>
          </TouchableOpacity>
        }}
      />
      <Button
        onPress={() =>
          navigation.navigate('Details', {
            name: 'Dan',
          })
        }
        title="Show Details"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
