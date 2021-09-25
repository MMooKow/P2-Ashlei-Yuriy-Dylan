# to use this dockerfile:
# 1. dotnet publish -o publish (within current dir)
# 2. docker build -t consolecontainerwithbuild:1.0 .
# 3. docker run --rm -it consolecontainerwithbuild:1.0

############ V2 ####################
# First build
        FROM  mcr.microsoft.com/dotnet/sdk:5.0
        WORKDIR /app

        # copy everything to root of docker image
        COPY . ./

        # steps below this refactored to be a bit faster
        RUN dotnet publish -o publish

        CMD [ "dotnet", "publish/API.dll" ]

        FROM  mcr.microsoft.com/dotnet/aspnet:5.0
        ENV ASPNETCORE_URLS=http://+:80  
        EXPOSE 80
        ENV ConnectionStrings__MySqlDb "DbConnection": "Server=tcp:rev-yyarytskyy.database.windows.net,1433;Initial Catalog=p2db;Persist Security Info=False;User ID=petadmin;Password=R@spberryPi4;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
        WORKDIR /app
# Second build
        # copy everything to root of docker image
        COPY . ./

        # steps below this refactored to be a bit faster
        CMD [ "dotnet", "API.dll" ]