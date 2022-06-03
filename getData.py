import requests
import json
KEY = "RGAPI-32a39307-0bf2-4e52-a134-1984f6c1d464"

# Get Challenger Players
def getChallengerData():
    URL = "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=" + KEY
    response = requests.get(URL)
    file = response.json()
    summonerID = []
    for i in range(len(file['entries'])):
        print(file['entries'][i]['summonerID'])
        summonerID.append(file['entries'][i]['summonerID'])
    for id in summonerID:
        
        

# Returns summoner profile by name SummonerDTO/dict
def getSummonerProfile(name, tagline):
    URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + name + "/" + tagline + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns summoner profile by PUUID
def getSummonerProfilePUUID(puuid):
    URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/" + puuid + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns name of summoner profile
# def getSummonerData(jsonFile, dataType):
#     data = jsonFile[dataType]
#     return data

# Returns list of match ID
def getMatchHistory(puuid, numGames):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=" + str(numGames) + "&api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns matchDTO
def getMatchData(matchID):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

getChallengerData()
# me = getSummonerProfile("Trivoid", "NA69")
# history = getMatchHistory(me["puuid"], 5)
# matchData = getMatchData(history[0])

# nameList = matchData['metadata']['participants']

# Print summoner role with name
# for i in range(10):
#     name = (getSummonerProfilePUUID(nameList[i]))['gameName']
#     role = data['info']['participants'][i]['role']
#     print(role,name)