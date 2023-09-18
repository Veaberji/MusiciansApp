FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 7093

ENV ASPNETCORE_URLS=http://+:7093

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG CONFIG=Release
WORKDIR /src

COPY ["MusiciansAPP.API/MusiciansAPP.API.csproj", "MusiciansAPP.API/"]
COPY ["MusiciansAPP.BL/MusiciansAPP.BL.csproj", "MusiciansAPP.BL/"]
COPY ["MusiciansAPP.Domain/MusiciansAPP.Domain.csproj", "MusiciansAPP.Domain/"]
COPY ["MusiciansAPP.DAL/MusiciansAPP.DAL.csproj", "MusiciansAPP.DAL/"]

RUN dotnet restore "MusiciansAPP.API/MusiciansAPP.API.csproj"
COPY . .
WORKDIR "/src/MusiciansAPP.API"
RUN dotnet build "MusiciansAPP.API.csproj" -c $CONFIG -o /app/build

FROM build AS publish
ARG CONFIG=Release
RUN dotnet publish "MusiciansAPP.API.csproj" -c $CONFIG -o /app/publish /p:UseAppHost=false

FROM base AS final
ARG API_KEY
WORKDIR /app
COPY --from=publish /app/publish .
ENV LASTFM_KEY=$API_KEY
CMD ["dotnet", "MusiciansAPP.API.dll"]
