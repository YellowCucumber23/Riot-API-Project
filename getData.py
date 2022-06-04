import requests
import json
import time
KEY = "RGAPI-bc296b54-4a58-4aa6-a028-e9abe4511995"

# Get Challenger Players


def getChallengerData():
    URL = "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=" + KEY
    response = requests.get(URL)
    file = response.json()  # Get data
    summonerID = []
    summonerProfile = []
    # For each entry, get summoner id and add to array
    for i in range(len(file['entries'])):
        summonerID.append(file['entries'][i]['summonerId'])
        summonerProfile.append(getSummonerProfile(
            file['entries'][i]['summonerId']))
        if i % 20:
            time.sleep(1)

    for id in summonerID:                        # For each summoner, get match history
        summoner = getSummonerProfile(id)
        match_history = getMatchHistory(summoner['puuid'], 5)
        for match in match_history:    # For each match in match history, get role played
            match_data = getMatchData(match)
            # nameList with PUUID
            nameList = match_data['metadata']['participants']
            for i in range(len(nameList)):
                if nameList[i] == summoner['puuid']:
                    role = match_data['info']['participants'][i]['role']
                    print(role, summoner['name'])

# Returns summoner profile by name SummonerDTO/dict


def getSummonerProfile(summonerID):
    URL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/" + \
        summonerID + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns summoner profile by PUUID


def getSummonerProfilePUUID(puuid):
    URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/" + \
        puuid + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns name of summoner profile
# def getSummonerData(jsonFile, dataType):
#     data = jsonFile[dataType]
#     return data

# Returns list of match ID


def getMatchHistory(puuid, numGames):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + \
        puuid + "/ids?start=0&count=" + str(numGames) + "&api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns matchDTO


def getMatchData(matchID):
    URL = "https://americas.api.riotgames.com/lol/match/v5/matches/" + \
        matchID + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()


getChallengerData()
# me = getSummonerProfile("Trivoid", "NA69")
# history = getMatchHistory(me["puuid"], 5)
# matchData = getMatchData(history[0])
# nameList = matchData['metadata']['participants']
# print(nameList)

# Print summoner role with name
# for i in range(10):
#     name = (getSummonerProfilePUUID(nameList[i]))['gameName']
#     role = data['info']['participants'][i]['role']
#     print(role,name)
