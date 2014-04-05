---
title: "How to scapy"
layout: post-ipynb.html
tags: [prism, NSA, mass surveillance, python, scapy]
category: [talks, words]
date: December 11, 2013
---


<div class="cell border-box-sizing code_cell vbox">
    <div class="input hbox">
        <div class="prompt input_prompt">
        In&nbsp;[1]:
        </div>
        <div class="input_area box-flex1">
            <div class="highlight-ipynb">
                <pre class="ipynb"><span class="kn">from</span> <span class="nn">scapy.all</span> <span class="kn">import</span> <span class="o">*</span>  <span class="c"># this makes me cringe</span></pre>
            </div>
        </div>
    </div>
</div>

<div class="cell border-box-sizing code_cell vbox">
    <div class="input hbox">
        <div class="prompt input_prompt">
            In&nbsp;[2]:
        </div>
        <div class="input_area box-flex1">
            <div class="highlight-ipynb">
                <pre class="ipynb"><span class="n">a</span> <span class="o">=</span> <span class="n">sniff</span><span class="p">(</span><span class="n">iface</span><span class="o">=</span><span class="s">&quot;en0&quot;</span><span class="p">,</span> <span class="nb">filter</span><span class="o">=</span><span class="s">&quot;tcp and port 80&quot;</span><span class="p">,</span> <span class="n">count</span><span class="o">=</span><span class="mi">10</span><span class="p">)</span></pre>
            </div>
        </div>
    </div>
</div>

<div class="cell border-box-sizing code_cell vbox">
    <div class="input hbox">
       <div class="prompt input_prompt">
            In&nbsp;[3]:
        </div>
        <div class="input_area box-flex1">
            <div class="highlight-ipynb">
                <pre class="ipynb"><span class="n">a</span></pre>
            </div>
        </div>
    </div>
    <div class="vbox output_wrapper">
        <div class="output vbox">
            <div class="hbox output_area">
                <div class="prompt output_prompt">
                    Out[3]:
                </div>
                <div class="box-flex1 output_subarea output_pyout">
                    <pre class="ipynb">&lt;Sniffed: TCP:10 UDP:0 ICMP:0 Other:0&gt;</pre>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="cell border-box-sizing code_cell vbox">
    <div class="input hbox">
        <div class="prompt input_prompt">In&nbsp;[4]:</div>
        <div class="input_area box-flex1">
            <div class="highlight-ipynb">
                <pre class="ipynb"><span class="n">a</span><span class="o">.</span><span class="n">res</span></pre>
            </div>
        </div>
    </div>
    <div class="vbox output_wrapper">
        <div class="output vbox">
            <div class="hbox output_area">
                <div class="prompt output_prompt">Out[4]:</div>
                <div class="box-flex1 output_subarea output_pyout">
                    <pre class="ipynb">[&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=650 flags=DF frag=0L ttl=64 proto=tcp chksum=0x9f88 src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53491 dport=http seq=3474155615 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0xecd6 urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433615, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=41196 flags=DF frag=0L ttl=64 proto=tcp chksum=0xb59a src=10.25.3.61 dst=50.31.164.188 options=[] |&lt;TCP  sport=53492 dport=http seq=3315328916 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x2b8d urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433615, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=40761 flags=DF frag=0L ttl=64 proto=tcp chksum=0xb74d src=10.25.3.61 dst=50.31.164.188 options=[] |&lt;TCP  sport=53493 dport=http seq=700164627 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x4ee urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433615, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=26980 flags=DF frag=0L ttl=64 proto=tcp chksum=0x38ae src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53494 dport=http seq=2552994569 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0xf110 urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433616, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=48861 flags=DF frag=0L ttl=64 proto=tcp chksum=0xe334 src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53495 dport=http seq=1279463156 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0xc90d urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433616, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=14036 flags=DF frag=0L ttl=64 proto=tcp chksum=0x6b3e src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53496 dport=http seq=2445014061 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x9e5a urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433616, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=60321 flags=DF frag=0L ttl=64 proto=tcp chksum=0xb670 src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53497 dport=http seq=405324467 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x4967 urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433616, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=34902 flags=DF frag=0L ttl=64 proto=tcp chksum=0x19bc src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53498 dport=http seq=3477655716 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x8454 urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433616, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=31060 flags=DF frag=0L ttl=64 proto=tcp chksum=0xd487 src=10.25.3.61 dst=192.33.31.101 options=[] |&lt;TCP  sport=53499 dport=http seq=3025988404 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x3030 urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433689, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;,<p>&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=33529 flags=DF frag=0L ttl=64 proto=tcp chksum=0xcae2 src=10.25.3.61 dst=192.33.31.101 options=[] |&lt;TCP  sport=53500 dport=http seq=1607594496 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0x7dee urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433689, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;]
                     </pre>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="cell border-box-sizing code_cell vbox">
    <div class="input hbox">
        <div class="prompt input_prompt">In&nbsp;[5]:</div>
        <div class="input_area box-flex1">
            <div class="highlight-ipynb">
                <pre class="ipynb"><span class="n">a</span><span class="o">.</span><span class="n">res</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span>  <span class="c"># first packet</span></pre>
            </div>
        </div>
    </div>
    <div class="vbox output_wrapper">
        <div class="output vbox">
            <div class="hbox output_area">
                <div class="prompt output_prompt">Out[5]:</div>
                <div class="box-flex1 output_subarea output_pyout">
                    <pre class="ipynb">&lt;Ether  dst=00:1d:70:df:2d:11 src=14:10:9f:e1:54:9b type=0x800 |&lt;IP  version=4L ihl=5L tos=0x0 len=64 id=650 flags=DF frag=0L ttl=64 proto=tcp chksum=0x9f88 src=10.25.3.61 dst=184.73.211.6 options=[] |&lt;TCP  sport=53491 dport=http seq=3474155615 ack=0 dataofs=11L reserved=0L flags=S window=65535 chksum=0xecd6 urgptr=0 options=[(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433615, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)] |&gt;&gt;&gt;</pre>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="cell border-box-sizing code_cell vbox">
    <div class="input hbox">
        <div class="prompt input_prompt">In&nbsp;[6]:</div>
        <div class="input_area box-flex1">
            <div class="highlight-ipynb">
                <pre class="ipynb"><span class="n">a</span><span class="o">.</span><span class="n">res</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span><span class="o">.</span><span class="n">show</span><span class="p">()</span></pre>
            </div>
        </div>
    </div>
    <div class="vbox output_wrapper">
        <div class="output vbox">
            <div class="hbox output_area">
                <div class="prompt output_prompt">Out[6]:</div>
                <div class="box-flex1 output_subarea output_pyout">
                    <pre class="ipynb">
###[ Ethernet ]###
  dst       = 00:1d:70:df:2d:11
  src       = 14:10:9f:e1:54:9b
  type      = 0x800
###[ IP ]###
     version   = 4L
     ihl       = 5L
     tos       = 0x0
     len       = 64
     id        = 650
     flags     = DF
     frag      = 0L
     ttl       = 64
     proto     = tcp
     chksum    = 0x9f88
     src       = 10.25.3.61
     dst       = 184.73.211.6
     \options   \
###[ TCP ]###
        sport     = 53491
        dport     = http
        seq       = 3474155615
        ack       = 0
        dataofs   = 11L
        reserved  = 0L
        flags     = S
        window    = 65535
        chksum    = 0xecd6
        urgptr    = 0
        options   = [(&apos;MSS&apos;, 1460), (&apos;NOP&apos;, None), (&apos;WScale&apos;, 4), (&apos;NOP&apos;, None), (&apos;NOP&apos;, None), (&apos;Timestamp&apos;, (1224433615, 0)), (&apos;SAckOK&apos;, &apos;&apos;), (&apos;EOL&apos;, None)]</pre>
</div>
</div>

</div>
</div>

</div>
