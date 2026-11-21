"use client";
import { useState } from "react";
import { Search } from "lucide-react";

export default function TrackRTI(){
  const [reference,setReference]=useState("");
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");
  async function submit(e){
    e.preventDefault();setError("");setResult(null);
    const r=await fetch(`/api/applications/track/${encodeURIComponent(reference.trim())}`);
    const data=await r.json();
    if(!r.ok)return setError(r.status===401?"Sign in to track this application.":r.status===403?"This reference belongs to another citizen.":"Application not found.");
    setResult(data.application);
  }
  return <main className="mx-auto max-w-2xl px-5 py-16">
    <div className="card p-7 sm:p-9">
      <p className="text-xs font-bold tracking-widest text-emerald-700">APPLICATION TRACKING</p>
      <h1 className="mt-2 text-3xl font-bold text-navy">Track an RTI application</h1>
      <form onSubmit={submit} className="mt-6 flex gap-3">
        <input className="field mt-0 flex-1 font-mono" name="reference" value={reference} onChange={e=>setReference(e.target.value.toUpperCase())} placeholder="RTI-2026-123456" required/>
        <button className="btn-primary"><Search size={16}/>Track</button>
      </form>
      {error&&<p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {result&&<dl className="mt-6 grid gap-4 rounded-xl bg-slate-50 p-5 text-sm sm:grid-cols-2">
        <Info label="Reference" value={result.referenceNumber}/>
        <Info label="Subject" value={result.subject}/>
        <Info label="Department" value={result.department}/>
        <Info label="Status" value={result.status.replaceAll("_"," ")}/>
        <Info label="Submitted" value={new Date(result.submittedAt).toLocaleString()}/>
        <Info label="Last updated" value={new Date(result.updatedAt).toLocaleString()}/>
      </dl>}
      {result?.officialResponse&&<article className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5"><h2 className="font-bold text-emerald-900">Official response</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6">{result.officialResponse.body}</p></article>}
    </div>
  </main>
}
function Info({label,value}){return <div><dt className="text-slate-500">{label}</dt><dd className="mt-1 font-semibold text-navy">{value}</dd></div>}
