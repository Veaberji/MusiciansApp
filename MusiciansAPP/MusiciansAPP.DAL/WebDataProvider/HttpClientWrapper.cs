﻿using System.Net.Http;
using System.Threading.Tasks;
using MusiciansAPP.DAL.WebDataProvider.LastFmDtoModels;

namespace MusiciansAPP.DAL.WebDataProvider;

public class HttpClientWrapper : IHttpClient
{
    private readonly HttpClient _httpClient = new();

    public async Task<HttpResponseMessage> GetAsync(string url)
    {
        return await _httpClient.GetAsync(url);
    }
}