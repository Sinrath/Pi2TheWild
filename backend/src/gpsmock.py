lat = 47.3748298
lon = 8.27233921
f = open("gps.txt", "w")
f.write(str(lat) + ' ')
f.write(str(lon))
f.close()
print lat, lon
            