import requests
import json
KEY = "RGAPI-45f830f4-c92b-4b3b-aee9-7554fad84642"


# Returns summoner profile SummonerDTO/dict
def getSummonerProfile(apiKey, name, tagline):
    URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + name + "/" + tagline + "?api_key=" + apiKey
    response = requests.get(URL)
    return response.json()

# Returns list of match ID
def getMatchHistory(apiKey, puuid, numGames):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=" + str(numGames) + "&api_key=" + apiKey
    response = requests.get(URL)
    return response.json()

# Returns matchDTO
def getMatchData(apiKey, matchID):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + apiKey
    response = requests.get(URL)
    return response.json()