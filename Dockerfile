# to use this dockerfile:
# 1. dotnet publish -o publish (within current dir)
# 2. docker build -t consolecontainerwithbuild:1.0 .
# 3. docker run --rm -it consolecontainerwithbuild:1.0

############ V2 ####################
# Run sdk things
        FROM  mcr.microsoft.com/dotnet/sdk:5.0 AS build
        WORKDIR /app/src
        
        # Copy everything to root of Docker image
        COPY API/*.csproj API/
        COPY API.Tests/*.csproj API.Tests/
        COPY Core/*.csproj Core/
        COPY Infrastructure/*.csproj Infrastructure/
        COPY *.sln ./
        RUN dotnet restore

        COPY . ./
        RUN dotnet publish --configuration Release --no-restore -o ../publish

# Run runtime things
        FROM  mcr.microsoft.com/dotnet/aspnet:5.0
        WORKDIR /app
        COPY --from=build /app/publish ./
        # copy everything to root of docker image
        ENV ASPNETCORE_URLS=http://+:80  
        EXPOSE 80
        ENV ConnectionStrings__MySqlDb "DbConnection": "Server=tcp:rev-yyarytskyy.database.windows.net,1433;Initial Catalog=p2db;Persist Security Info=False;User ID=petadmin;Password=R@spberryPi4;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
        ENV ConnectionStrings_LocalDb "localhost"
        CMD [ "dotnet", "API.dll" ]