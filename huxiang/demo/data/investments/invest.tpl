<li class="invest-item">
			<div class="detail">
				<div class="item-caption"><%=caption%></div>
					<ul class="detail-item-list">
						<li class="detail-item width-50">
							<label for="">年利率:</label>
							<span class="value" type="text" readonly ><%=yearRate%></span>
						</li>
						<li class="detail-item width-50">
							<label for="">回购期限:</label>
							<span class="value" type="text" readonly ><%=period%></span>
						</li>
						<li class="detail-item width-100">
							<label for="">流转总额:</label>
							<span class="value" type="text" readonly >
						
							<% if(moneyType === "cn") { %>
								￥
							<%}%>
							
							<%else if (moneyType === "us") {%>
								$
							<%}%>
							
							<%=flowTotal%></span>
						</li>
					</ul>
				</div>
			</div>
			<div class="btn btn-invest">投资</div>
		</li>