import requests
import json
import time
import roleml

KEY = "RGAPI-dccf168a-1996-4d04-afa5-ae5817e1b461"

# Get Challenger Players
def getChallengerData():
    URL = "https://na1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=" + KEY
    response = requests.get(URL)
    file = response.json()  # Get data
    summonerProfile = []
    
    # For each entry, get summoner id and add to array
    for i in range(int(len(file['entries'])/20)):          # Get challenger players
        summonerID = file['entries'][i]['summonerId']
        summonerProfile.append(summonerID)
    counter = 0
    for id in summonerProfile:                        # For each summoner, get match history
        if counter % 3 == 0:
            time.sleep(1)
        summoner = getSummonerProfile(id)
        match_history = getMatchHistory(summoner['puuid'], 5)
        for match in match_history:    # For each match in match history, get role played
            match_data = getMatchData(match)
            nameList = match_data['metadata']['participants']
            for i in range(len(nameList)):
                if nameList[i] == summoner['puuid']:
                    role = match_data['info']['participants'][i]['role']
                    lane = match_data['info']['participants'][i]['lane']
                    print(role, lane, summoner['name'])
            counter+=1

# Returns summoner profile by name SummonerDTO/dict
def getSummonerProfile(summonerID):
    URL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/" + summonerID + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

# Returns summoner profile by PUUID
def getSummonerProfilePUUID(puuid):
    URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/" + puuid + "?api_key=" + KEY
    response = requests.get(URL)
    return response.json()

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
print("done")
# me = getSummonerProfile("WxXjL1AvdgEzGovLQhFDcryd0lv2lVqtsSA_BgFKgk2JvBo")
# history = getMatchHistory(me['puuid'], 5)
# matchData = getMatchData(history[0])
# nameList = matchData['metadata']['participants']
# print(nameList)

#Print summoner role with name
# for i in range(10):
#     name = (getSummonerProfilePUUID(nameList[i]))['gameName']
#     role = data['info']['participants'][i]['role']
#     print(role,name)
