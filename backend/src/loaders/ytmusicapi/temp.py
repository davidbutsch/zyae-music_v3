# def search(payload):
#     query = payload.get('query')  # Get the 'query' value from payload
#     filter_value = payload.get('filter')

#     if filter_value is not None:
#         result = ytmusic.search(query=query, filter=filter_value)
#     else:
#         result = ytmusic.search(query=query)
#     return result


# def getSearchSuggested(payload):
#     result = ytmusic.get_search_suggestions(query=payload['query'])
#     return result

# def getLyrics(payload):
#     result = ytmusic.get_lyrics(browseId=payload['id'])
#     return result

# # print(ytmusic.get_lyrics(browseId="rn4mVQswfNg"))

# def getArtist(payload):
#     result = ytmusic.get_artist(channelId=payload['id'])
#     return result

# # channelId: UCprAFmT0C6O4X0ToEXpeFTQ
# # browseId: MPADUCprAFmT0C6O4X0ToEXpeFTQ
# # params: ggMIegYIAhoCAQI%3D
# def getArtistAlbums(payload):
#     result = ytmusic.get_artist_albums(channelId=payload['id'], params=payload['params'])
#     return result

# def getAlbum(payload):
#     result = ytmusic.get_album(browseId=payload['id'])
#     return result

# def getPlaylist(payload):
#     result = ytmusic.get_playlist(playlistId=payload['id'])
#     return result

# def getWatchlist(payload):
#     result = ytmusic.get_watch_playlist(videoId=payload['id'], radio=True, limit=50)
#     return result

# def getSongRelated(payload):
#     result = ytmusic.get_song_related(browseId=payload['id'])
#     return result

# def getCharts(payload):
#     result = ytmusic.get_charts(country="US")
#     return result

# def getMoodCategories(payload):
#     result = ytmusic.get_mood_categories()
#     return result

# def getMoodContent(payload):
#     result = ytmusic.get_mood_playlists(params=payload['params'])
#     return result
