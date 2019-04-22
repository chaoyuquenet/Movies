import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = '';
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false
    };
  }

  loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        }
      );
    }
  }

  searchTextInputChanged(text) {
    this.searchedText = text;
  }

  searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => {
        this.loadFilms();
      }
    );
  }

  displayDetailForFilm = idFilm => {
    this.props.navigation.navigate('FilmDetail', { idFilm: idFilm });
  };

  displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={text => this.searchTextInputChanged(text)}
          onSubmitEditing={() => this.searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this.searchFilms()} />
        <FlatList
          data={this.state.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <FilmItem
              film={item}
              isFilmFavorite={
                this.props.favoritesFilm.findIndex(
                  film => film.id === item.id
                ) !== -1
                  ? true
                  : false
              }
              displayDetailForFilm={this.displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              this.loadFilms();
            }
          }}
        />
        {this.displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
    // marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  };
};

export default connect(mapStateToProps)(Search);
